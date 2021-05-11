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

export class CreateTagihanDto {

    @IsOptional()
    channel: string;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    transaction_id: number;


    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    user_id: number;

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    stan_meter_awal: number;

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    stan_meter_akhir: number;

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    penggunaan: number;

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    tagihan_air: number;

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    sampah: number;

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    keamanan: number;

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    admin: number;

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    sub_total_tagihan: number;

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    denda: number;

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    grand_total: number;

    // @IsNotEmpty()
    date: string;

    // @IsNotEmpty()
    // @Type(() => Number)
    // @IsNumber()
    // status: number;

    // @IsNotEmpty()
    @IsOptional()
    foto: string;
}




export class CreateTagihanImage {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
}
