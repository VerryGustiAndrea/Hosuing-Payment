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
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {

    @IsNotEmpty()
    // @IsAlphanumeric()
    name: number;

    @IsNotEmpty()
    // @MinLength(5)
    // @IsOptional()
    // @IsAlphanumeric()
    no_kontrak?: string;

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
