import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dto';
// Todos los servicios son providers, no todos los providers son servicios

@Injectable()
export class CarsService {

    private cars: Car[] = [
       /*  {
            id: uuid(),
            brand: 'Toyota',
            model: 'Corolla'
        },
        {
            id: uuid(),
            brand: 'Honda',
            model: 'Civic'
        }, {
            id: uuid(),
            brand: 'Jeep',
            model: 'Cherokee'
        }, */
    ];

    findALL() {
        return this.cars;
    }

    findOneById(id: string) {

        const car = this.cars.find(car => car.id === id);

        if (!car) throw new NotFoundException(`Car with id '${id}' not found`);

        return car;

    }

    create(createCartDto: CreateCarDto) {


        /* const car: Car = {
            id: uuid(),
            brand:createCartDto.brand,
            model: createCartDto.model
        } */

        const car: Car = {
            id: uuid(),
            ...createCartDto
        }

        this.cars.push(car);

        return car;
    }

    update(id: string, updateCartDto: UpdateCarDto) {

        let carDB = this.findOneById(id)

        this.cars = this.cars.map(car => {

            if (car.id == id) {
                carDB = {
                    ...carDB,
                    ...updateCartDto,
                    id
                }
                return carDB;
            }
            return car;
        })
        return carDB;
    }

    delete(id: string) {

        const car= this.findOneById(id);

        this.cars = this.cars.filter(car => car.id !== id)
    }

    fillCarsWithSeedData(cars:Car[]){
        this.cars = cars;
    }
}
