import Contract from "../models/Contract";
import NotFoundException from "../exceptions/http/NotFoundException";
import {Op} from "sequelize";
import Job from "../models/Job";
import {Profile} from "../models/Profile";
import {model} from "../model";
import ConflictException from "../exceptions/http/ConflictException";
import GoneException from "../exceptions/http/GoneException";

export default class JobService {
  public static async getContract(id: string) {

    const contract = await Contract.findByPk(id);

    if (!contract) {
      throw new NotFoundException("Contract not found");
    }

    return contract;

  }

  public static async getUnpaidJobs(profile: Profile) {
    return await Job.findAll({
      where: {
        // paid is null or false
        paid: {
          [Op.or]: [null, false]
        }
      },
      include: [
        {
          model: Contract,
          where: {
            [Op.or]: {
              "ClientId": profile.id,
              "ContractorId": profile.id
            },
          }
        }
      ]
    });
  }

  public static async getJob(id: string) {
    const job = await Job.findByPk(id);

    if (!job) {
      throw new NotFoundException("Job not found");
    }

    return job;
  }

  public static async payJob(profile: Profile, jobId: string) {
    const job = await JobService.getJob(jobId);

    if (job.paid) {
      throw new GoneException("Job already paid");
    }

    if (profile.balance < job.price) {
      throw new ConflictException("Not enough money");
    }

    const contract = await Contract.findByPk(job.ContractId, {
      include:{
        model: Profile,
        as: "Contractor",
        required: true
      }
    });

    if (!contract) {
      throw new NotFoundException("Contract not found");
    }

    if (profile.id !== contract.ClientId) {
      throw new ConflictException("You are not the client");
    }

    return model.transaction(async (t) => {
      job.paid = true;
      await job.save({transaction: t});

      await profile.decrement("balance", {by: job.price, transaction: t});

      await contract.Contractor.increment("balance", {by: job.price, transaction: t});
    })
  }


}
