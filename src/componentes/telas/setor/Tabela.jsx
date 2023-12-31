import { useContext } from "react";
import SetorContext from "./SetorContext";
import Alerta from '../../comuns/Alerta'

function Tabela() {

    const { alerta, setAlerta, listaObjetos, remover,
        setEditar, setObjeto, recuperar, recuperarPesos }
        = useContext(SetorContext);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Setores</h1>
            <Alerta alerta={alerta} />
            <button type="button" className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#modalEdicao"
                onClick={() => {
                    setEditar(false);
                    setAlerta({ status: "", message: "" });
                    setObjeto({
                        codigo: 0,
                        numero: "", descricao: "", capacidade: "",
                        academia : ""
                    });
                }}>
                Novo
            </button>
            {listaObjetos.length === 0 &&
                <h1>Nenhum setor encontrado</h1>}
            {listaObjetos.length > 0 && (
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col"
                                    style={{ textAlign: 'center' }}>Ações</th>
                                <th scope="col">Código</th>
                                <th scope="col">Número</th>
                                <th scope="col">Descrição</th>
                                <th scope="col">Capacidade</th>
                                <th scope="col">Academia</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaObjetos.map(objeto => (
                                <tr key={objeto.codigo}>
                                    <td align="center">
                                        <button className="btn btn-info" title="Editar"
                                            data-bs-toggle="modal"
                                            data-bs-target="#modalEdicao"
                                            onClick={() => {
                                                recuperar(objeto.codigo);
                                                setEditar(true);
                                                setAlerta({ status: "", message: "" });
                                            }}>
                                            <i className="bi bi-pencil-square"></i>
                                        </button>
                                        <button className="btn btn-danger" title="Remover"
                                            onClick={() => remover(objeto)}>
                                            <i className="bi bi-trash"></i>
                                        </button>
                                        <button className="btn btn-success" title="Pesos"
                                            onClick={() => {
                                                recuperarPesos(objeto.codigo);
                                                setAlerta({ status: "", message: "" });
                                            }}>
                                            <i className="bi bi-pc-display"></i>
                                        </button>                                        
                                    </td>
                                    <th scope="row">{objeto.codigo}</th>                                    
                                    <td>{objeto.numero}</td>
                                    <td>{objeto.descricao}</td>
                                    <td>{objeto.capacidade}</td>
                                    <td>{objeto.nomeacademia}</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            )}

        </div>
    )

}

export default Tabela;