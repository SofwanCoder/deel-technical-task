import Contract from "../models/Contract";
import NotFoundException from "../exceptions/http/NotFoundException";
import {Op, Sequelize} from "sequelize";
import Job from "../models/Job";
import {Profile} from "../models/Profile";
import {model} from "../model";
import ConflictException from "../exceptions/http/ConflictException";
import GoneException from "../exceptions/http/GoneException";

export default class AdminService {
  public static async getBestProfession() {
    // Returns the profession that earned the most money (sum of jobs paid) for any contactor that worked in the query time range

    const profiles = await Profile.findAll({
      include: [
        {
          model: Contract,
          as: "Contractor",
          required: true,
          attributes: [],
          include: [
            {
              model: Job,
              attributes: [],
              required: true,
              where:{
                paid: true
              }
            }
          ]
        }
      ],
      attributes: [
        'profession',
        [Sequelize.literal("SUM(`Contractor->Job`.price)"), "amount_earned"],
      ],
      group: ['profession'],
      order: [[Sequelize.col('amount_earned'), 'DESC']],
    })

    const topProfile = profiles.shift();

    if (!topProfile) {
      throw new NotFoundException("No data to decide best profession");
    }

    return topProfile.get("profession");
  }

  public static async getBestClient() {
    // returns the clients the paid the most for jobs in the query time period. limit query parameter should be applied, default limit is 2.
    const profiles = await Profile.findAll({
      include: [
        {
          model: Contract,
          as: "Client",
          required: true,
          attributes: [],
          include: [
            {
              model: Job,
              attributes: [],
              required: true,
              where: {
                paid: true
              }
            }
          ]
        }
      ],
      attributes: [
        'id',
        'firstName',
        'lastName',
        'profession',
        'balance',
        'type',
        'createdAt',
        'updatedAt',
        [Sequelize.literal("SUM(`Client->Job`.price)"), "amount_paid"],
      ],
      order: [[Sequelize.col('amount_paid'), 'DESC']],
    })

    return profiles;
  }
}
