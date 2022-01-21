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
} from '@nestjs/common';
import { Pagination } from '@ports/utils';
import { Tag } from '@tag/domain/model/tag.entity';
import {
  CreateTagDto,
  QueryParamsTagDto,
  UpdateTagDto,
} from '@tag/interface/dto';
import { CreateTagService, UpdateTagService } from '@tag/useCases/command';
import { FindOneTagService, FindTagService } from '@tag/useCases/queries';

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
  create(@Body() data: CreateTagDto): Promise<Tag> {
    this.logger.log(`Creating tag: ${JSON.stringify(data)}`);
    return this.createTagService.execute(data);
  }

  @Get()
  find(@Query() query: QueryParamsTagDto): Promise<Pagination<Tag>> {
    this.logger.log(`Finding tags`);
    return this.findTagService.execute(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Tag> {
    this.logger.log(`Finding tag: ${id}`);
    const tag = await this.findOneTagService.execute(id);

    if (!tag) throw new NotFoundException(`Tag with id: ${id} not found`);

    return tag;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateTagDto): Promise<Tag> {
    this.logger.log(`Updating tag: ${id} with data: ${JSON.stringify(data)}`);
    return this.updateTagService.execute(id, data);
  }
}
