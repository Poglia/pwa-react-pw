import { useContext } from "react";
import SetorContext from "./SetorContext";
import Alerta from '../../comuns/Alerta'

function TabelaPesos() {

    const { alerta, setAlerta, listaPesos, removerPeso,
        objeto, setEditarPeso, setPeso, recuperarPesos,
        setExibirPesos }
        = useContext(SetorContext);

    return (
        <div style={{ padding: '20px' }}>
            <button className="btn btn-secondary" onClick={() => {
                setExibirPesos(false);
                setAlerta({ status: "", message: "" });
            }}>
               Voltar <i className="bi bi-backspace"></i>
            </button>
            <h1>Pesos do Setor : {objeto.numero}</h1>
            <Alerta alerta={alerta} />
            <button type="button" className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#modalEdicaoPeso"
                onClick={() => {
                    setEditarPeso(false);
                    setAlerta({ status: "", message: "" });
                    setPeso({
                        codigo: 0,
                        descricao: "", numero_serie: "",
                        valor : "", setor: objeto.codigo
                    });
                }}>
                Novo
            </button>
            {listaPesos.length === 0 &&
                <h1>Nenhum peso encontrado</h1>}
            {listaPesos.length > 0 && (
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col"
                                    style={{ textAlign: 'center' }}>Ações</th>
                                <th scope="col">Código</th>
                                <th scope="col">Descrição</th>
                                <th scope="col">Número Série</th>
                                <th scope="col">Valor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaPesos.map(peso => (
                                <tr key={peso.codigo}>
                                    <td align="center">
                                        <button className="btn btn-info" title="Editar"
                                            data-bs-toggle="modal"
                                            data-bs-target="#modalEdicaoPeso"
                                            onClick={() => {
                                                recuperarPesos(peso.codigo);
                                                setEditarPeso(true);
                                                setAlerta({ status: "", message: "" });
                                            }}>
                                            <i className="bi bi-pencil-square"></i>
                                        </button>
                                        <button className="btn btn-danger" title="Remover"
                                            onClick={() => removerPeso(peso)}>
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </td>
                                    <th scope="row">{peso.codigo}</th>
                                    <td>{peso.descricao}</td>
                                    <td>{peso.numero_serie}</td>
                                    <td>{peso.valor}</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            )}

        </div>
    )

}

export default TabelaPesos;