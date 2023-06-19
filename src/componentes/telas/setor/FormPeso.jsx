import { useContext } from "react";
import Alerta from "../../comuns/Alerta";
import SetorContext from "./SetorContext";
import CampoEntrada from "../../comuns/CampoEntrada";
import Dialogo from "../../comuns/Dialogo";

function FormPeso() {

    const { peso, handleChangePeso,
        acaoCadastrarPeso, alerta } = useContext(SetorContext);

    return (
        <Dialogo id="modalEdicaoPeso" titulo="Peso"
            acaoCadastrar={acaoCadastrarPeso}
            idform="formularioPeso">
            <Alerta alerta={alerta} />
            <CampoEntrada id="txtCodigo" label="Código"
                tipo="number" name="codigo" value={peso.codigo}
                onchange={handleChangePeso} requerido={false}
                readonly={true} />
            <CampoEntrada id="txtDescricao" label="Descrição"
                tipo="text" name="descricao"
                value={peso.descricao}
                onchange={handleChangePeso} requerido={true}
                readonly={false} maxlength={40}
                msgvalido="Descrição OK"
                msginvalido="Informe a descrição" />
            <CampoEntrada id="txtNumeroSerie" label="Número de série"
                tipo="text" name="numero_serie"
                value={peso.numero_serie}
                onchange={handleChangePeso} requerido={true}
                readonly={false} maxlength={40}
                msgvalido="Número de série OK"
                msginvalido="Informe o número de série" />
            <CampoEntrada id="txtValor" label="Valor"
                tipo="number" name="valor" value={peso.valor}
                onchange={handleChangePeso} requerido={true}
                readonly={false} maxlength={10}
                msgvalido="Valor OK"
                msginvalido="Informe o valor" />           
        </Dialogo>
    )

}

export default FormPeso;