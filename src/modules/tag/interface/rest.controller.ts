import { RequestWithUser } from '@auth/interface/dto';
import {
  Body,
  Controller,
  Get,
  Logger,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { Pagination } from '@ports/utils';
import { Tag } from '@tag/domain/tag.entity';
import {
  CreateTagDto,
  QueryParamsTagDto,
  UpdateTagDto,
} from '@tag/interface/dto';
import {
  CreateTagService,
  FindOneTagService,
  FindTagService,
  UpdateTagService,
} from '@tag/useCases';

@Controller('tag')
export class TagRestController {
  private readonly logger = new Logger(TagRestController.name);

  constructor(
    private readonly createTagService: CreateTagService,
    private readonly findTagService: FindTagService,
    private readonly findOneTagService: FindOneTagService,
    private readonly updateTagService: UpdateTagService,
  ) {}

  @Post()
  create(
    @Req() request: RequestWithUser,
    @Body() data: CreateTagDto,
  ): Promise<Tag> {
    this.logger.log(`Creating tag: ${JSON.stringify(data)}`);

    const userId = request.user.id;

    return this.createTagService.execute({ ...data, userId });
  }

  @Get()
  find(
    @Req() request: RequestWithUser,
    @Query() query: QueryParamsTagDto,
  ): Promise<Pagination<Tag>> {
    this.logger.log(`Finding tags`);

    const userId = request.user.id;

    return this.findTagService.execute({ ...query, userId });
  }

  @Get(':id')
  async findOne(
    @Req() request: RequestWithUser,
    @Param('id') id: string,
  ): Promise<Tag> {
    this.logger.log(`Finding tag: ${id}`);

    const userId = request.user.id;

    const tag = await this.findOneTagService.execute(id);

    if (!tag || tag.userId !== userId)
      throw new NotFoundException(`Tag with id: ${id} not found`);

    return tag;
  }

  @Put(':id')
  update(
    @Req() request: RequestWithUser,
    @Param('id') id: string,
    @Body() data: UpdateTagDto,
  ): Promise<Tag> {
    this.logger.log(`Updating tag: ${id} with data: ${JSON.stringify(data)}`);

    const userId = request.user.id;

    return this.updateTagService.execute(id, { ...data, userId });
  }
}
