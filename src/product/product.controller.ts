import { Controller, Get, Post, Put, Delete, Body, Param, UsePipes, UseInterceptors, UploadedFile, UploadedFiles, Res, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDTO } from './product.dto';
import { ValidationPipe } from 'src/shared/validation.pipe';
import { ApiBody, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@ApiTags('product')
@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) {

    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    showAllProduct() {
        return this.productService.showAll();
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    @ApiBody({ type: [ProductDTO] })
    @UsePipes(new ValidationPipe())
    createProduct(@Body() data: ProductDTO) {
        return this.productService.create(data);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    readProduct(@Param('id') id: number) {
        return this.productService.read(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    @ApiBody({ type: [ProductDTO] })
    @UsePipes(new ValidationPipe())
    updateProduct(@Param('id') id: number, @Body() data: Partial<ProductDTO>) {
        return this.productService.update(id, data);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    destroyProduct(@Param('id') id: number) {
        return this.productService.destroy(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('upload')
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './upload',
            filename: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
                return cb(null, `${randomName}${extname(file.originalname)}`)
            }
        })
    }))
    
    @UseGuards(AuthGuard('jwt'))
    uploadFile(@UploadedFile() file) {
        const response = {
            filename: file.filename
        };
        return response;
    }
    
    @UseGuards(AuthGuard('jwt'))
    @Get('image/:imgpath')
    seeUploadedFile(@Param('imgpath') image, @Res() res) {
        return res.sendFile(image, { root: './upload' });
    }
}
