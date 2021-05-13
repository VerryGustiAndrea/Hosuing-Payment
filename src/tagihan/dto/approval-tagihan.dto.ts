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

export class ApprovalTagihanDto {

    @Type(() => Number)
    @IsNumber()
    trx_id: number;

    sid: string;

    status: string;

    via: string;

}

