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
    BeforeValidate,
    ForeignKey,
} from 'sequelize-typescript';
import { UUIDV4, ValidationError } from 'sequelize';
import {
    categoryOption,
    colorOption,
    fitOption,
    hemlineOption,
    lengthOption,
    neckOption,
    occassionOption,
    originArray,
    productCategoryOption,
    sleeveLengthOption,
    sustainableOption,
    transparencyOptions,
    WashOption,
} from '../utils/static';
import { Product } from './product';

@Table({
    tableName: 'product details',
    timestamps: true,
    underscored: true, // Use snake_case columns for better SQL conventions
    paranoid: true, // Adds 'deletedAt' for soft deletes
})
export class ProductDetails extends Model<ProductDetails> {
    @PrimaryKey
    @IsUUID(4)
    @Default(UUIDV4)
    @Column(DataType.UUID)
    id!: string;

    @AllowNull(true)
    @Column(DataType.INTEGER)
    productCategory!: number;

    // @BeforeValidate
    // static validateproductCategory(productDetails: ProductDetails) {
    //     const validcategories = productCategoryOption.map((item) => item.id);
    //     if (!validcategories.includes(productDetails.productCategory)) {
    //         throw new ValidationError('Invalid product category ID.', []);
    //     }
    // }

    @AllowNull(true)
    @Default(0)
    @Column(DataType.INTEGER)
    category!: number;

    // @BeforeValidate
    // static validatecategory(productDetails: ProductDetails) {
    //     const validcategories = categoryOption.map((item) => item.id);
    //     if (!validcategories.includes(productDetails.category)) {
    //         throw new ValidationError('Invalid category ID.', []);
    //     }
    // }

    @AllowNull(false)
    @Column(DataType.ARRAY(DataType.STRING))
    sizes!: string[];

    @AllowNull(false)
    @Default(0)
    @Column(DataType.INTEGER)
    origin!: number;

    // @BeforeValidate
    // static validateOrigin(productDetails: ProductDetails) {
    //     const validOrigins = originArray.map((item) => item.id);
    //     if (!validOrigins.includes(productDetails.origin)) {
    //         throw new ValidationError('Invalid origin ID.', []);
    //     }
    // }

    @AllowNull(false)
    @Column(DataType.INTEGER)
    transparency!: number;

    // @BeforeValidate
    // static validateTransparency(productDetails: ProductDetails) {
    //     const validTransparencies = transparencyOptions.map((item) => item.id);
    //     if (!validTransparencies.includes(productDetails.transparency)) {
    //         throw new ValidationError('Invalid transparency option.', []);
    //     }
    // }

    @AllowNull(false)
    @Column(DataType.INTEGER)
    occasion!: number;

    // @BeforeValidate
    // static validateOccasion(productDetails: ProductDetails) {
    //     const validOccasions = occassionOption.map((item) => item.id);
    //     if (!validOccasions.includes(productDetails.occasion)) {
    //         throw new ValidationError('Invalid occasion option.', []);
    //     }
    // }

    @Column(DataType.STRING)
    trend!: string;

    @Column(DataType.STRING)
    print!: string;

    @Column(DataType.STRING)
    fabric!: string;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    color!: number;

    // @BeforeValidate
    // static validateColor(productDetails: ProductDetails) {
    //     const validColors = colorOption.map((item) => item.id);
    //     if (!validColors.includes(productDetails.color)) {
    //         throw new ValidationError('Invalid color option.', []);
    //     }
    // }

    @AllowNull(false)
    @Column(DataType.INTEGER)
    neck!: number;

    // @BeforeValidate
    // static validateNeck(productDetails: ProductDetails) {
    //     const validNecks = neckOption.map((item) => item.id);
    //     if (!validNecks.includes(productDetails.neck)) {
    //         throw new ValidationError('Invalid neck option.', []);
    //     }
    // }

    @AllowNull(false)
    @Column(DataType.INTEGER)
    sleeveLength!: number;

    // @BeforeValidate
    // static validateSleeveLength(productDetails: ProductDetails) {
    //     const validSleeveLengths = sleeveLengthOption.map((item) => item.id);
    //     if (!validSleeveLengths.includes(productDetails.sleeveLength)) {
    //         throw new ValidationError('Invalid sleeve length option.', []);
    //     }
    // }

    @AllowNull(false)
    @Column(DataType.INTEGER)
    hemline!: number;

    // @BeforeValidate
    // static validateHemline(productDetails: ProductDetails) {
    //     const validHemlines = hemlineOption.map((item) => item.id);
    //     if (!validHemlines.includes(productDetails.hemline)) {
    //         throw new ValidationError('Invalid hemline option.', []);
    //     }
    // }

    @AllowNull(false)
    @Column(DataType.INTEGER)
    wash!: number;

    // @BeforeValidate
    // static validateWash(productDetails: ProductDetails) {
    //     const validWashOptions = WashOption.map((item) => item.id);
    //     if (!validWashOptions.includes(productDetails.wash)) {
    //         throw new ValidationError('Invalid wash care option.', []);
    //     }
    // }

    @AllowNull(false)
    @Column(DataType.INTEGER)
    fit!: number;

    // @BeforeValidate
    // static validateFit(productDetails: ProductDetails) {
    //     const validFits = fitOption.map((item) => item.id);
    //     if (!validFits.includes(productDetails.fit)) {
    //         throw new ValidationError('Invalid fit option.', []);
    //     }
    // }

    @AllowNull(false)
    @Column(DataType.INTEGER)
    length!: number;

    // @BeforeValidate
    // static validateLength(productDetails: ProductDetails) {
    //     const validLengths = lengthOption.map((item) => item.id);
    //     if (!validLengths.includes(productDetails.length)) {
    //         throw new ValidationError('Invalid length option.', []);
    //     }
    // }

    @AllowNull(false)
    @Column(DataType.INTEGER)
    sustainable!: number;

    // @BeforeValidate
    // static validateSustainable(productDetails: ProductDetails) {
    //     const validSustainableOptions = sustainableOption.map((item) => item.id);
    //     if (!validSustainableOptions.includes(productDetails.sustainable)) {
    //         throw new ValidationError('Invalid sustainable option.', []);
    //     }
    // }

    @AllowNull(false)
    @Default(false)
    @Column(DataType.BOOLEAN)
    is_active!: boolean;

    @AllowNull(false)
    @Column(DataType.UUID)
    userId!: string;

    @ForeignKey(() => Product)
    @AllowNull(false)
    @Column(DataType.UUID)
    productId!: string;

}
