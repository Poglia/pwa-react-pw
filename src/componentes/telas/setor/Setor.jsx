import { useState, useEffect } from "react";
import SetorContext from "./SetorContext";
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";
import { getAcademiasAPI } from '../../servicos/AcademiaServico';
import { getSetoresAPI, getSetorPorCodigoAPI, deleteSetorPorCodigoAPI, cadastraSetoresAPI } from '../../servicos/SetorServico'
import {
    getPesosDaSetorAPI, getPesoPorCodigoAPI,
    deletePesoPorCodigoAPI, cadastraPesosAPI
} from '../../servicos/PesoServico';
import FormPeso from "./FormPeso";
import TabelaPesos from "./TabelaPesos";
import WithAuth from "../../seg/WithAuth";
import { useNavigate } from "react-router-dom";


function Academia() {

    let navigate = useNavigate();

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: "", nome: "",
        descricao: "", sigla: ""
    });
    const [carregando, setCarrengando] = useState(true);
    const [listaAcademias, setListaAcademias] = useState([]);
    const [editarPeso, setEditarPeso] = useState(false);
    const [peso, setPeso] = useState({
        codigo: "", descricao: "", numero_serie: "", valor: "", setor: ""
    })
    const [listaPesos, setListaPesos] = useState([]);
    const [exibirPesos, setExibirPesos] = useState(false);

    const recuperarPesos = async codigosetor => {
        try {
            setObjeto(await getSetorPorCodigoAPI(codigosetor));
            setListaPesos(await getPesosDaSetorAPI(codigosetor));
            setExibirPesos(true);
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const recuperarPeso = async codigo => {
        try {
            setPeso(await getPesoPorCodigoAPI(codigo));
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const removerPeso = async peso => {
        if (window.confirm('Deseja remover este peso?')) {
            let retornoAPI =
                await deletePesoPorCodigoAPI(peso.codigo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            setListaPesos(await getPesosDaSetorAPI(objeto.codigo));
        }
    }

    const acaoCadastrarPeso = async e => {
        e.preventDefault();
        const metodo = editarPeso ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraPesosAPI(peso, metodo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            setObjeto(retornoAPI.objeto);
            if (!editarPeso) {
                setEditarPeso(true);
            }
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
        recuperarPesos(objeto.codigo);
    }

    const handleChangePeso = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setPeso({ ...peso, [name]: value });
    }

    const recuperar = async codigo => {
        try {
            setObjeto(await getSetorPorCodigoAPI(codigo));
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraSetoresAPI(objeto, metodo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            setObjeto(retornoAPI.objeto);
            if (!editar) {
                setEditar(true);
            }
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
        recuperaSetores();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    const recuperaSetores = async () => {
        try {
            setCarrengando(true);
            setListaObjetos(await getSetoresAPI());
            setCarrengando(false);
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const recuperaAcademias = async () => {
        setListaAcademias(await getAcademiasAPI());
    }

    const remover = async objeto => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                let retornoAPI = await deleteSetorPorCodigoAPI(objeto.codigo);
                setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            } catch (err) {
                console.log(err);
                window.location.reload();
                navigate("/login", { replace: true });
            }
        }
        recuperaSetores();
    }

    useEffect(() => {
        recuperaSetores();
        recuperaAcademias();
    }, []);

    return (
        <SetorContext.Provider value={{
            alerta, setAlerta,
            listaObjetos, setListaObjetos,
            recuperaAcademias, remover,
            objeto, setObjeto,
            editar, setEditar,
            recuperar, acaoCadastrar, handleChange, listaAcademias,
            listaPesos, peso, setPeso, handleChangePeso,
            removerPeso, recuperarPeso, acaoCadastrarPeso,
            setEditarPeso, editarPeso, recuperarPesos,
            setExibirPesos
        }}>
            <Carregando carregando={carregando}>
                {!exibirPesos ? <Tabela /> : <TabelaPesos />}
            </Carregando>
            <Form />
            <FormPeso />
        </SetorContext.Provider>
    )

}

export default WithAuth(Academia);