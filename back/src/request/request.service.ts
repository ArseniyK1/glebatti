import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { IsNull, Like, Raw, Repository } from 'typeorm';
import { requestStatusEnum } from '../constants';
import { ChangeStatusDto } from './dto/change-status.dto';
import { User } from '../user/entities/user.entity';
import { GetAllRequestDto } from './dto/getAllRequest.dto';
import { ProposedRequestDto } from './dto/ProposedRequest.dto';
import { DoneRequestDto } from './dto/DoneRequest.dto';

@Injectable()
export class RequestService {
  constructor(
    @Inject('REQUEST_REPOSITORY')
    private requestRepository: Repository<any>,
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async createRequest(req: any, dto: CreateRequestDto) {
    if (dto) {
      const request = await this.requestRepository.save({
        ...dto,
        type_right: dto.type_right,
        status: requestStatusEnum.PENDING,
        user: req.user.userId,
        active: false,
      }); // Если из списка предлагаемых типов проблем не нашлось нужной, пользователь выбирате "прочее" и описывает свою проблему

      return request;
    } else {
      throw new HttpException(
        'Вы не указали данные для заявки!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAllRequestByUser(req: any) {
    // return await this.requestRepository.find({
    //   where: { userId: req.user.userId },
    // });
    return await this.requestRepository.find({
      relations: { type_right: true },
    });
  }

  async doneRequest(req: any, dto: DoneRequestDto) {
    const request = await this.requestRepository.update(
      { id: dto.requestId },
      { status: requestStatusEnum.DONE, active: false },
    );
    const oneReq = await this.requestRepository.findOne({
      where: { id: +dto.requestId },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/ban-ts-comment
    // @ts-ignore

    return request;
    // const request = await this.requestRepository.findOne({
    //   where: { id: +dto.requestId },
    // });
    // console.log(request.raw);
  }

  async findAllRequests(query: GetAllRequestDto) {
    const requests = await this.requestRepository.find({
      relations: { type_right: true, user: true },
      where: {
        status: !!query?.status ? Like(`%${query?.status}%`) : null,
        user: [
          {
            last_name: !!query?.userName
              ? Raw(
                  (alias) =>
                    `LOWER(${alias}) LIKE LOWER('%${query?.userName}%')`,
                )
              : null,
          },
          {
            first_name: !!query?.userName
              ? Raw(
                  (alias) =>
                    `LOWER(${alias}) LIKE LOWER('%${query?.userName}%')`,
                )
              : null,
          },
          {
            middle_name: !!query?.userName
              ? Raw(
                  (alias) =>
                    `LOWER(${alias}) LIKE LOWER('%${query?.userName}%')`,
                )
              : null,
          },
        ],
        trouble_type: !!query?.trouble_type
          ? Raw(
              (alias) =>
                `LOWER(${alias}) LIKE LOWER('%${query?.trouble_type}%')`,
            )
          : null,
      },
      order: { id: 'DESC' },
    });

    const requestsWithLawyers = await Promise.all(
      requests.map(async (request) => {
        if (request.lawyerId) {
          const lawyer = await this.userRepository.findOne({
            where: { id: request.lawyerId },
            order: { id: 'DESC' },
          });
          return { ...request, lawyer };
        }
        return request;
      }),
    );

    return requestsWithLawyers;
  }

  async getMyRequest(req: any) {
    const requests = await this.requestRepository.find({
      where: { user: { id: req.user.userId } },
      relations: { type_right: true, user: true },
      order: { id: 'DESC' },
    });

    const requestsWithLawyers = await Promise.all(
      requests.map(async (request) => {
        if (request.lawyerId) {
          const lawyer = await this.userRepository.findOne({
            where: { id: request.lawyerId },
            order: { id: 'DESC' },
          });
          return { ...request, lawyer };
        }
        return request;
      }),
    );

    return requestsWithLawyers;
  }

  async getOpenRequestByLawyer() {
    return await this.requestRepository.find({
      where: { lawyerId: IsNull() },
    });
  }

  async proposedRequest(dto: ProposedRequestDto) {
    return await this.requestRepository.update(
      { id: +dto.requestId },
      {
        proposedLawyerId: +dto.lawyerId,
      },
    );
  }
  async fetchMyRequests(lawyerId: number, query: GetAllRequestDto) {
    const queryBuilder = this.requestRepository
      .createQueryBuilder('request')
      .leftJoinAndSelect('request.type_right', 'type_right')
      .leftJoinAndSelect('request.user', 'user')
      .where('request.lawyerId = :lawyerId', { lawyerId });

    if (query.status) {
      queryBuilder.andWhere('request.status ~* :status', {
        status: query.status,
      });
    }

    if (query.userName) {
      queryBuilder.andWhere(
        '(user.last_name ILIKE :userName OR user.first_name ILIKE :userName OR user.middle_name ILIKE :userName)',
        { userName: `%${query.userName}%` },
      );
    }

    if (query.trouble_type) {
      queryBuilder.andWhere('request.trouble_type ILIKE :trouble_type', {
        trouble_type: `%${query.trouble_type}%`,
      });
    }

    return await queryBuilder.getMany();
  }

  async getProposedRequest(lawyerId: number) {
    return await this.requestRepository.find({
      where: { proposedLawyerId: lawyerId },
      relations: { type_right: true, user: true },
    });
  }

  async findOne(id: number) {
    const request = await this.requestRepository.findOne({
      where: { id: id },
      relations: { type_right: true, user: true },
    });

    if (!!request?.lawyerId) {
      const lawyer = await this.userRepository.findOne({
        where: { id: request.lawyerId },
      });
      const proposedLawyer = await this.userRepository.findOne({
        where: { id: request.proposedLawyerId },
      });
      return { ...request, lawyer: lawyer, proposedLawyer: proposedLawyer };
    }
    const proposedLawyer = await this.userRepository.findOne({
      where: { id: request.proposedLawyerId },
    });
    return { request, proposedLawyer };
  }

  async update(requestId: number, dto: UpdateRequestDto) {
    const portfolio = await this.findOne(requestId);
    if (!portfolio?.id)
      throw new HttpException('Заявка не найдена', HttpStatus.NOT_FOUND);
    // return await portfolio.update(dto);
    return 'sadasd';
  }

  async offerTimeConsultation(
    userId: number,
    requestId: number,
    dateTime: Date,
  ) {
    const request = await this.requestRepository.findOne({
      where: { id: requestId },
    });
    if (!request?.id)
      throw new HttpException('Заявка не найдена', HttpStatus.NOT_FOUND);
    return await this.requestRepository.save({
      ...request,
      suggested_date_meeting: dateTime,
    });
  }

  async confirmSuggestedTime(requestId: number) {
    const req = await this.requestRepository.findOne({
      where: {
        id: requestId,
      },
    });
    if (!req?.id)
      throw new HttpException('Заявка не найдена', HttpStatus.NOT_FOUND);
    const dateMeeting = req.suggested_date_meeting;
    return await this.requestRepository.update(
      { id: requestId },
      {
        date_meeting: dateMeeting,
        suggested_date_meeting: null,
      },
    );
  }

  async changeStatus(dto: ChangeStatusDto) {
    // const portfolio = await this.findOne(requestId);
    // if (!portfolio?.id)
    //   throw new HttpException('Заявка не найдена', HttpStatus.NOT_FOUND);
    // return await portfolio.update(dto);
    const request = await this.requestRepository.findOne({
      where: { id: dto.requestId },
    });
    return await this.requestRepository.save({
      ...request,
      lawyerId: dto.lawyerId,
      status: dto.status,
    });
  }

  async respondRequest(lawyerId: number, requestId: number) {
    const request = await this.requestRepository.findOne({
      where: { id: requestId },
    });
    return await this.requestRepository.save({
      ...request,
      lawyerId,
      proposedLawyerId: 0,
      active: true,
      status: requestStatusEnum.ACCEPTED,
    });
  }

  async remove(id: number) {
    const request = await this.requestRepository.findOne({
      where: { id: id },
    });
    return await this.requestRepository.remove(request);
  }

  async rejectDateMeeting(requestId: string) {
    const request = await this.requestRepository.findOne({
      where: { id: +requestId },
    });
    if (
      request.status === requestStatusEnum.ACCEPTED ||
      request.status === requestStatusEnum.DONE ||
      request.status === requestStatusEnum.CANCELED
    )
      throw new HttpException(
        'Заявка не может быть отменена',
        HttpStatus.BAD_REQUEST,
      );
    return await this.requestRepository.update(
      { id: +requestId },
      {
        status: requestStatusEnum.CANCELED,
        active: false,
        proposedLawyerId: 0,
        lawyerId: 0,
      },
    );
  }
}
