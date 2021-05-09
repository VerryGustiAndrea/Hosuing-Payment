export class UserDto { }


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

export class LoginUserDto {

    @IsNotEmpty()
    // @MinLength(5)
    // @IsAlphanumeric()
    username: string;

    @IsNotEmpty()
    // @MinLength(5)
    // @IsAlphanumeric()
    password?: string;

}

