import { Controller, Get, Post, Body, Param, Put, Delete, HttpStatus, HttpException } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from '../entities/usuario.entity';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  findAll(): Promise<Usuario[]> {
    return this.usuarioService.findAll();
  }

  @Post('login')
  async login(@Body() loginDto: { usuario: string; contraseña: string }) {
    try {
      // Validación de datos de entrada
      const { usuario, contraseña } = loginDto;
      if (!usuario || !contraseña) {
        throw new HttpException(
          'El usuario y la contraseña son requeridos',
          HttpStatus.BAD_REQUEST,
        );
      }

      // Llamar al servicio para autenticar al usuario
      const user = await this.usuarioService.findOne(usuario, contraseña);
      if (!user) {
        throw new HttpException(
          'Usuario o contraseña incorrectos',
          HttpStatus.UNAUTHORIZED,
        );
      }

      // Respuesta en caso de éxito
      return {
        statusCode: HttpStatus.OK,
        message: 'Inicio de sesión exitoso',
        data: user,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error; // Reenvía los errores controlados
      }

      console.error('Error interno del servidor:', error.message);
      throw new HttpException(
        'Error interno del servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }


  @Post()
  async create(@Body() data: Partial<Usuario>): Promise<Usuario> {
    try {
      return await this.usuarioService.createUser(data);
    } catch (error) {
      console.error('Error al crear usuario:', error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<Usuario>): Promise<Usuario> {
    return this.usuarioService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.usuarioService.delete(id);
  }

  @Post('crear-datos')
  async crearDatos(@Body() data: Record<string, any>) {
    try {
      console.log("Datos: "+data);
      // Llamamos al servicio para crear los datos en las tablas
      const resultado = await this.usuarioService.crearDatos(data);
      return {
        status: HttpStatus.CREATED,
        message: 'Datos insertados correctamente',
        data: resultado,
      };
    } catch (error) {
      // En caso de error, devolvemos una respuesta HTTP adecuada
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error al insertar los datos',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
