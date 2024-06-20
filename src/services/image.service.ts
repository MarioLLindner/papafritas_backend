import { Injectable } from '@nestjs/common';
import axiosInstance from './axios/config';
const key: string = 'd0d3c5f46c7538581ede714a5406fc16';

@Injectable()
export class ImageService {
  constructor() {}
  async upload(file: Express.Multer.File) {
    const formdata: FormData = new FormData();
    formdata.append('image', new Blob([Buffer.from(file.buffer)]));
    formdata.append('key', key);
    formdata.append('name', 'nombre');
    const response = await axiosInstance.post('/upload', formdata);
    return response.data;
  }
}