import { Injectable } from '@nestjs/common';

@Injectable()
export class GatsiaService {
    getHello(): string {
        return 'Hello from Gatsia!';
    }
}
