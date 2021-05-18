import {
    IsEmail,
    IsString,
    IsNumber,
    IsOptional,
    IsMobilePhone,
    IsDateString,
    IsEthereumAddress,
    IsBtcAddress,
    IsNotEmpty,
    ValidateNested,
    IsAlphanumeric,
    IsAlpha,
    MinLength,
    MaxLength,
    isAlphanumeric,
    IsUUID
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {

    @IsNotEmpty()
    // @IsAlphanumeric()
    name: number;

    @IsNotEmpty()
    // @IsAlphanumeric()
    email: number;

    @IsNotEmpty()
    // @MinLength(5)
    // @IsOptional()
    // @IsAlphanumeric()
    username?: string;

    @IsNotEmpty()
    // @IsOptional()
    // @Type(() => Number)
    // @IsNumber()
    password?: string;

    @IsNotEmpty()
    // @IsOptional()
    // @Type(() => Number)
    // @IsNumber()
    role?: string;


}

//  class CreateMenuImage {
//     file: Images[];
// }
