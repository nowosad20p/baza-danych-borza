DROP DATABASE IF EXISTS ioio;
CREATE DATABASE ioio;
ALTER DATABASE ioio DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
use ioio;

CREATE TABLE Adresy
(id_adresu int auto_increment primary key,
kraj varchar(50),
miasto text NOT NULL,
kod_pocztowy varchar(10) NOT NULL,
ulica text NOT NULL,
nr_domu varchar(10) NOT NULL
);

CREATE TABLE Pacjenci
(
    id_pacjenta int auto_increment primary key,
    imie_pacjenta varchar(50) NOT NULL,
    nazwisko_pacjenta varchar(50) NOT NULL,
    id_adresu int NOT NULL,
    nr_telefonu text NOT NULL,
    FOREIGN KEY (id_adresu) REFERENCES Adresy(id_adresu)
);

CREATE TABLE Ratownicy
(
    id_ratownika int auto_increment primary key,
    imie_ratownika varchar(50) NOT NULL,
    nazwisko_ratownika varchar(50) NOT NULL,
    id_adresu int NOT NULL,
    nr_telefonu text NOT NULL,
    FOREIGN KEY (id_adresu) REFERENCES Adresy(id_adresu)
);

CREATE TABLE Specjalizacje_lekarzy
(
    id_specjalizacji int auto_increment primary key,
    nazwa_specjalizacji text NOT NULL
);
CREATE TABLE Lekarze
(
    id_lekarza int auto_increment primary key,
    imie_lekarza varchar(50) NOT NULL,
    nazwisko_lekarza varchar(50) NOT NULL,
    id_adresu int NOT NULL,
    nr_telefonu text NOT NULL,
    id_specjalizacji int NOT NULL,
    FOREIGN KEY (id_adresu) REFERENCES Adresy(id_adresu),
    FOREIGN KEY (id_specjalizacji) REFERENCES Specjalizacje_lekarzy(id_specjalizacji)
);

CREATE TABLE Operatorzy
(
    id_operatora int auto_increment primary key,
    imie_operatora varchar(50) NOT NULL,
    nazwisko_operatora varchar(50) NOT NULL,
    id_adresu int NOT NULL,
    nr_telefonu text NOT NULL,
    FOREIGN KEY (id_adresu) REFERENCES Adresy(id_adresu)
);

CREATE TABLE Kategorie_wezwania
(
    id_kategorii int auto_increment primary key,
    nazwa_kategorii text NOT NULL
);

CREATE TABLE Specjalizacje_karetek
(
    id_specjalizacji int auto_increment primary key,
    nazwa_specjalizacji text NOT NULL
);
CREATE TABLE Wyposazenie
(
    id_wyposazenia int auto_increment primary key,
    nazwa_wyposazenia text NOT NULL
);
CREATE TABLE Karetki
(
id_karetki int auto_increment primary key,
model_karetki text NOT NULL,
id_specjalizacji int NOT NULL,
FOREIGN KEY (id_specjalizacji) REFERENCES Specjalizacje_karetek(id_specjalizacji)
);
CREATE TABLE Wyposazenie_karetki
(
    id_karetki int NOT NULL,
    id_wyposazenia int NOT NULL,
    FOREIGN KEY (id_karetki) REFERENCES Karetki(id_karetki),
    FOREIGN KEY (id_wyposazenia) REFERENCES Wyposazenie(id_wyposazenia)
);
CREATE TABLE Wezwania
(
id_wezwania INT auto_increment primary key,
id_lekarza int NOT NULL,
id_pacjenta int NOT NULL,
id_kategorii int NOT NULL,
id_operatora int NOT NULL,
id_karetki int NOT NULL,
data_wezwania date NOT NULL,
dodatkowe_informacje text NOT NULL,
FOREIGN KEY (id_lekarza) REFERENCES Lekarze(id_lekarza),
FOREIGN KEY (id_pacjenta) REFERENCES Pacjenci(id_pacjenta),
FOREIGN KEY (id_kategorii) REFERENCES Kategorie_wezwania(id_kategorii),
FOREIGN KEY (id_operatora) REFERENCES Operatorzy(id_operatora),
FOREIGN KEY (id_karetki) REFERENCES Karetki(id_karetki)
);

CREATE TABLE Ratownicy_wezwanie
(
    id_wezwania int,
    id_ratownika int,
    FOREIGN KEY (id_wezwania) REFERENCES Wezwania(id_wezwania),
    FOREIGN KEY (id_ratownika) REFERENCES Ratownicy(id_ratownika)
);