import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Tag } from '@tag/domain/model/tag.entity';
import { CreateTagDto, UpdateTagDto } from '@tag/interface/dto';
import {
  CreateTagService,
  UpdateTagService,
} from 'src/modules/tag/core/services/useCases/command';
import { FindTagService } from 'src/modules/tag/core/services/useCases/queries';

@Controller('tag')
export class TagRestController {
  private readonly logger = new Logger(TagRestController.name);

  constructor(
    private readonly createTagService: CreateTagService,
    private readonly findTagService: FindTagService,
    private readonly updateTagService: UpdateTagService,
  ) {}

  @Post()
  create(@Body() data: CreateTagDto): Promise<Tag> {
    this.logger.log(`Creating tag: ${JSON.stringify(data)}`);
    return this.createTagService.execute(data);
  }

  @Get()
  find(): Promise<Tag[]> {
    this.logger.log(`Finding tags`);
    return this.findTagService.execute();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateTagDto): Promise<Tag> {
    this.logger.log(`Updating tag: ${id} with data: ${JSON.stringify(data)}`);
    return this.updateTagService.execute(id, data);
  }
}
