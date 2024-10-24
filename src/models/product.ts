import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    AllowNull,
    Default,
    IsUUID,
    BeforeCreate,
} from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';

@Table({
    tableName: 'products',
    timestamps: true,
    underscored: true, // Use snake_case columns for better SQL conventions
    paranoid: true, // Adds 'deletedAt' for soft deletes
})
export class Product extends Model<Product> {
    @PrimaryKey
    @IsUUID(4)
    @Default(UUIDV4)
    @Column(DataType.UUID)
    id!: string;

    @AutoIncrement
    @Column(DataType.INTEGER)
    asin!: number;

    @BeforeCreate
    static generateAsin(product: Product) {
        product.asin = Math.floor(100000000 + Math.random() * 900000000); // Generate a 9-digit random number for ASIN
    }

    @AllowNull(false)
    @Column(DataType.STRING)
    productTitle!: string;

    @AllowNull(false)
    @Column(DataType.TEXT)
    productDescription!: string;

    @AllowNull(false)
    @Column(DataType.ARRAY(DataType.STRING))
    productImages!: string[];

    @AllowNull(false)
    @Column(DataType.STRING)
    brand!: string;

    @AllowNull(false)
    @Column(DataType.DECIMAL(10, 2))
    price!: number;

    @Column(DataType.DECIMAL(5, 2))
    discount!: number;

    @AllowNull(false)
    @Column(DataType.DECIMAL(10, 2))
    mrp!: number;

    @AllowNull(false)
    @Default(false)
    @Column(DataType.BOOLEAN)
    is_active!: boolean;

    @AllowNull(false)
    @Default(false)
    @Column(DataType.BOOLEAN)
    is_approved!: boolean;

    @AllowNull(false)
    @Column(DataType.STRING)
    userId!: string;

}
