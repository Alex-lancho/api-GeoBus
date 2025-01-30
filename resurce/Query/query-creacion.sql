CREATE database bdruta;
USE bdruta ;

-- -----------------------------------------------------
-- Table COMBI
-- -----------------------------------------------------
CREATE TABLE COMBI (
  idCombi CHAR(36) NOT NULL,
  placa VARCHAR(45) NULL,
  modelo VARCHAR(45) NULL,
  linea VARCHAR(45) NULL,
  PRIMARY KEY (idCombi))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table USUARIO
-- -----------------------------------------------------
CREATE TABLE USUARIO (
  idUsuario CHAR(36) NOT NULL,
  tipo VARCHAR(45) NULL,
  usuario VARCHAR(80) NULL,
  contraseña VARCHAR(80) NULL,
  PRIMARY KEY (idUsuario))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table CHOFER
-- -----------------------------------------------------
CREATE TABLE CHOFER (
  idChofer CHAR(36) NOT NULL,
  nombre VARCHAR(45) NULL,
  apellidos VARCHAR(90) NULL,
  dni CHAR(8) NULL,
  idCombi CHAR(36) NOT NULL,
  idUsuario CHAR(36) NOT NULL,
  PRIMARY KEY (idChofer),
  INDEX fk_CHOFER_COMBI_idx (idCombi ASC) VISIBLE,
  INDEX fk_CHOFER_USUARIO1_idx (idUsuario ASC) VISIBLE,
  CONSTRAINT fk_CHOFER_COMBI
    FOREIGN KEY (idCombi)
    REFERENCES COMBI (idCombi),
  CONSTRAINT fk_CHOFER_USUARIO1
    FOREIGN KEY (idUsuario)
    REFERENCES USUARIO (idUsuario))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table HORARIO
-- -----------------------------------------------------
CREATE TABLE HORARIO (
  idHorario CHAR(36) NOT NULL,
  horaPartida VARCHAR(45) NULL,
  horaLlegada VARCHAR(45) NULL,
  tiempoLlegada VARCHAR(45) NULL,
  idCombi CHAR(36) NOT NULL,
  PRIMARY KEY (idHorario),
  INDEX fk_HORARIO_COMBI1_idx (idCombi ASC) VISIBLE,
  CONSTRAINT fk_HORARIO_COMBI1
    FOREIGN KEY (idCombi)
    REFERENCES COMBI (idCombi))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table ALERTA
-- -----------------------------------------------------
CREATE TABLE ALERTA (
  idAlerta CHAR(36) NOT NULL,
  descripcion VARCHAR(200) NULL,
  hora DATETIME NULL,
  idChofer CHAR(36) NOT NULL,
  PRIMARY KEY (idAlerta),
  INDEX fk_ALERTA_CHOFER1_idx (idChofer ASC) VISIBLE,
  CONSTRAINT fk_ALERTA_CHOFER1
    FOREIGN KEY (idChofer)
    REFERENCES CHOFER (idChofer))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table UBICACION
-- -----------------------------------------------------
CREATE TABLE UBICACION (
  idUbicacion CHAR(36) NOT NULL,
  ejeX DECIMAL(10,5) NULL,
  ejeY DECIMAL(10,5) NULL,
  nombreLugar VARCHAR(150) NULL,
  tiempoTranscurrido TIME NULL,
  idCombi CHAR(36) NOT NULL,
  PRIMARY KEY (idUbicacion),
  INDEX fk_RUTA_COMBI1_idx (idCombi ASC) VISIBLE,
  CONSTRAINT fk_RUTA_COMBI1
    FOREIGN KEY (idCombi)
    REFERENCES COMBI (idCombi))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table NOTIFICACION
-- -----------------------------------------------------
CREATE TABLE NOTIFICACION (
  idNotificacion CHAR(36) NOT NULL,
  tipo VARCHAR(45) NULL,
  descripcion VARCHAR(250) NULL,
  tipoUsuario VARCHAR(45) NULL,
  MacMovil VARCHAR(250) NULL,
  PRIMARY KEY (idNotificacion))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table EVALUACION
-- -----------------------------------------------------
CREATE TABLE EVALUACION (
  idEvaluacion CHAR(36) NOT NULL,
  puntualidad VARCHAR(45) NULL,
  comodidad VARCHAR(45) NULL,
  fecha VARCHAR(45) NULL,
  descripcion VARCHAR(300) NULL,
  idChofer CHAR(36) NOT NULL,
  PRIMARY KEY (idEvaluacion),
  INDEX fk_EVALUACION_CHOFER1_idx (idChofer ASC) VISIBLE,
  CONSTRAINT fk_EVALUACION_CHOFER1
    FOREIGN KEY (idChofer)
    REFERENCES CHOFER (idChofer))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table RUTA
-- -----------------------------------------------------
CREATE TABLE RUTA (
  idRuta CHAR(36) NOT NULL,
  ejeX DECIMAL(10,5) NULL,
  ejeY DECIMAL(10,5) NULL,
  nombreLugar VARCHAR(200) NULL,
  paradero VARCHAR(200) NULL,
  idCombi CHAR(36) NOT NULL,
  PRIMARY KEY (idRuta),
  INDEX fk_RUTA_COMBI2_idx (idCombi ASC) VISIBLE,
  CONSTRAINT fk_RUTA_COMBI2
    FOREIGN KEY (idCombi)
    REFERENCES COMBI (idCombi))
ENGINE = InnoDB;