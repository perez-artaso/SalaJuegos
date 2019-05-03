<?php

include_once('./BDCon.php');

class AdminPuntajes{
    
    private $id_usuario;
    private $BDCon;

    public function __construct($usr){
        $this->BDCon = BDCon::NuevaBDCon();
        $this->leerId($usr);
    }

    private function leerId($usr){
        $BDCon = BDCon::NuevaBDCon();
        $consulta = $BDCon->RetornarConsulta('SELECT id FROM usuarios WHERE usr LIKE ?');
        $consulta->bindValue(1, $usr, PDO::PARAM_STR);
        $consulta->execute();
        $resultado = $consulta->fetchAll()[0];
        
        $this->id_usuario = $resultado["id"];
        

    }

    // ------------
    // |  Códigos  |
    // ------------ 
    // 0 = Anagrama
    // 1 = Piedra, Papel o Tijeras
    // 2 = Adivina el numero
    // 3 = Cálculo
    // 4 = Memotest

    public function registrarPuntaje($codigoJuego, $puntaje){
        try{
            switch($codigoJuego){
                case 0:            
                $puntajeAcumulado = $this->getPuntaje($codigoJuego);
                $nuevoPuntaje = $puntajeAcumulado + $puntaje;
                $consulta = $this->BDCon->RetornarConsulta("UPDATE tableros SET anagrama = ? WHERE id_usuario = ?");
                $consulta->bindValue(1, $nuevoPuntaje, PDO::PARAM_INT);
                $consulta->bindValue(2, $this->id_usuario, PDO::PARAM_INT);
                $consulta->execute();
                break;
    
                case 1:            
                $puntajeAcumulado = $this->getPuntaje($codigoJuego);
                $nuevoPuntaje = $puntajeAcumulado + $puntaje;
                $consulta = $this->BDCon->RetornarConsulta("UPDATE tableros SET ppot = ? WHERE id_usuario = ?");
                $consulta->bindValue(1, $nuevoPuntaje, PDO::PARAM_INT);
                $consulta->bindValue(2, $this->id_usuario, PDO::PARAM_INT);
                $consulta->execute();
                break;
    
                case 2:            
                $puntajeAcumulado = $this->getPuntaje($codigoJuego);
                $nuevoPuntaje = $puntajeAcumulado + $puntaje;
                $consulta = $this->BDCon->RetornarConsulta("UPDATE tableros SET adivina = ? WHERE id_usuario = ?");
                $consulta->bindValue(1, $nuevoPuntaje, PDO::PARAM_INT);
                $consulta->bindValue(2, $this->id_usuario, PDO::PARAM_INT);
                $consulta->execute();
                break;
    
                case 3:            
                $puntajeAcumulado = $this->getPuntaje($codigoJuego);
                $nuevoPuntaje = $puntajeAcumulado + $puntaje;
                $consulta = $this->BDCon->RetornarConsulta("UPDATE tableros SET calculo = ? WHERE id_usuario = ?");
                $consulta->bindValue(1, $nuevoPuntaje, PDO::PARAM_INT);
                $consulta->bindValue(2, $this->id_usuario, PDO::PARAM_INT);
                $consulta->execute();
                break;
    
                case 4:            
                $puntajeAcumulado = $this->getPuntaje($codigoJuego);
                $nuevoPuntaje = $puntajeAcumulado + $puntaje;
                $consulta = $this->BDCon->RetornarConsulta("UPDATE tableros SET memotest = ? WHERE id_usuario = ?");
                $consulta->bindValue(1, $nuevoPuntaje, PDO::PARAM_INT);
                $consulta->bindValue(2, $this->id_usuario, PDO::PARAM_INT);
                $consulta->execute();
                break;
            }
        } catch(Exception $e){
            echo($e);
            return false;
        }
        return true;        
    }

    public function getPuntaje($codigoJuego){
        try{            
            switch($codigoJuego){
                case 0:
                $consulta = $this->BDCon->RetornarConsulta("SELECT anagrama FROM tableros WHERE id_usuario LIKE ? ");
                $consulta->bindValue(1, $this->id_usuario, PDO::PARAM_INT);
                $consulta->execute();
                $resultado = $consulta->fetchAll()[0];
                $retValue = $resultado["anagrama"];
                break;

                case 1:
                $consulta = $this->BDCon->RetornarConsulta("SELECT ppot FROM tableros WHERE id_usuario LIKE ? ");
                $consulta->bindValue(1, $this->id_usuario, PDO::PARAM_INT);
                $consulta->execute();
                $resultado = $consulta->fetchAll()[0];
                $retValue = $resultado["ppot"];
                break;

                case 2:
                $consulta = $this->BDCon->RetornarConsulta("SELECT adivina FROM tableros WHERE id_usuario LIKE ? ");
                $consulta->bindValue(1, $this->id_usuario, PDO::PARAM_INT);
                $consulta->execute();
                $resultado = $consulta->fetchAll()[0];
                $retValue = $resultado["adivina"];
                break;

                case 3:
                $consulta = $this->BDCon->RetornarConsulta("SELECT calculo FROM tableros WHERE id_usuario LIKE ? ");
                $consulta->bindValue(1, $this->id_usuario, PDO::PARAM_INT);
                $consulta->execute();
                $resultado = $consulta->fetchAll()[0];
                $retValue = $resultado["calculo"];
                break;

                case 4:
                $consulta = $this->BDCon->RetornarConsulta("SELECT memotest FROM tableros WHERE id_usuario LIKE ? ");
                $consulta->bindValue(1, $this->id_usuario, PDO::PARAM_INT);
                $consulta->execute();
                $resultado = $consulta->fetchAll()[0];
                $retValue = $resultado["memotest"];
                break;        
            }

        }catch(Exception $e){
            echo($e);
            exit;
        }
        return $retValue;
    }

    public function consultarPuntajes(){
        try{
            $consulta = $this->BDCon->RetornarConsulta("SELECT * FROM tableros WHERE id_usuario = ?");
            $consulta->bindValue(1, $this->id_usuario, PDO::PARAM_INT);
            $consulta->execute();
            $tableros = $consulta->fetchAll()[0];            

            $puntajes = [
                "anagrama" => $tableros["anagrama"],
                "ppot" => $tableros["ppot"],
                "adivina" => $tableros["adivina"],
                "calculo" => $tableros["calculo"],
                "memotest" => $tableros["memotest"]
            ];

            return json_encode($puntajes);

        } catch(Exception $e){
            echo($e);
            return false;
        }
    }
}