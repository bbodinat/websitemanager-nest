import { Site } from '@gatsia/gatsia/sites/entities/site.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { Repository } from 'typeorm';

@ValidatorConstraint({ async: true })
export class IsInDBConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(Site)
    private sitesRepository: Repository<Site>,
  ) {}

  async validate(value: any, args: ValidationArguments) {
    // Simulate database check
    console.log(this)
    const existingUsers = await this.sitesRepository.findBy({ id: value }); // Replace with DB call
    return existingUsers.includes(value);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must exist in the database. "${args.value}" does not exist.`;
  }
}

// Custom decorator to use this validator
export function IsInDB(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsInDBConstraint,
    });
  };
}
