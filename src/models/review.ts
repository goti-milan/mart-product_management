import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    Default,
    ForeignKey,
    AllowNull,
    IsUUID,
} from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';
import { Product } from './product';

@Table({
    tableName: 'reviews',
    timestamps: true,
    underscored: true, // Use snake_case columns for better SQL conventions
    paranoid: true, // Adds 'deletedAt' for soft deletes
})
export class Review extends Model<Review> {
    @PrimaryKey
    @IsUUID(4)
    @Default(UUIDV4)
    @Column(DataType.UUID)
    id!: string;

    @ForeignKey(() => Product)
    @AllowNull(false)
    @Column(DataType.UUID)
    productId!: string;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    star!: number;

    @AllowNull(false)
    @Column(DataType.TEXT)
    description!: string;

    @AllowNull(false)
    @Column(DataType.UUID)
    orderId!: string;

    @AllowNull(false)
    @Column(DataType.UUID)
    userId!: string;

}
