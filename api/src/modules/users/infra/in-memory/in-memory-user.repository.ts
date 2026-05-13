import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository.abstract';
import { User } from '../../../entities/user.entity';
import { CreateUserDto } from '../../../dto/create-user.dto';
import { UpdateUserDto } from '../../../dto/update-user.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  async create(data: CreateUserDto): Promise<User> {
    const user: User = {
      id: randomUUID(),
      ...data,
      createdAt: new Date(),
    };
    this.users.push(user);
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find((user) => user.id === id) || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) || null;
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) throw new Error('User not found');
    
    this.users[index] = { ...this.users[index], ...data };
    return this.users[index];
  }

  async delete(id: string): Promise<void> {
    this.users = this.users.filter((user) => user.id !== id);
  }
}