<?php
use \Firebase\JWT\JWT;
include_once('./BDCon.php');

class Inscriptor{

    public static function registrarUsuario($usr, $pass){
        if(Inscriptor::chequearDisponibilidad($usr)){
            $BDCon = BDCon::NuevaBDCon();
            $consulta = $BDCon->RetornarConsulta("INSERT INTO usuarios (usr, pass) VALUES (?, ?)");
            $consulta->bindValue(1, $usr, PDO::PARAM_STR);
            $consulta->bindValue(2, $pass, PDO::PARAM_STR);
            $consulta->execute();
            
            $consulta = $BDCon->RetornarConsulta("SELECT MAX(id) FROM usuarios");
            $consulta->execute();
            $id_usuario = $consulta->fetchAll()[0]["MAX(id)"];

            $consulta = $BDCon->RetornarConsulta("INSERT INTO tableros (id_usuario, anagrama, ppot, adivina, calculo, memotest) VALUES (?, 0, 0, 0, 0, 0)");
            $consulta->bindValue(1, $id_usuario, PDO::PARAM_INT);
            $consulta->execute();

            return true;
        } else return false;
    }

    private static function chequearDisponibilidad($usr){

        $BDCon = BDCon::NuevaBDCon();
        $consulta = $BDCon->RetornarConsulta("SELECT * FROM usuarios WHERE usr = ?");
        $consulta->bindValue(1, $usr, PDO::PARAM_STR);
        $consulta->execute();
        $resultado = $consulta->fetchAll();
        return count($resultado) == 0 ? true : false;
    }

    public static function Login($nom, $pass) {
        $retValue = 0;
        $BDCon = BDCon::NuevaBDCon();
        
        $consulta = $BDCon->RetornarConsulta("SELECT * FROM usuarios WHERE usr LIKE ?");        
        $consulta->bindValue(1, $nom, PDO::PARAM_STR);
        $consulta->execute();
        $usuario = $consulta->fetchAll();
        if (count($usuario) == 0) {
            $retValue = -1;
        }
        else {
            if ($pass === $usuario[0]["pass"]) {
                $ahora = new DateTime();
                $futuro = new DateTime("+30 minutes");
                $payload = [
                    "iat"=> $ahora->getTimeStamp(),
                    "exp"=> $futuro->getTimeStamp(),
                    "sub"=> "localhost",
                    "usr"=> $usuario[0]["usr"],
                    "id"=> $usuario[0]["id"]
                ];
                $secret = "123456";
                $token = JWT::encode($payload, $secret, "HS256");
                $retValue = $token;             

            }
        }
        
        return $retValue;
        
    }


}