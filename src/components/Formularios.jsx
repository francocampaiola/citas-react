import {useState, useEffect} from 'react';
import Error from './Error';

function Formularios({pacientes, setPacientes, paciente, setPaciente}) {
    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');

    const [error, setError] = useState(false);

    useEffect(() => {
        if (Object.keys(paciente).length > 0) {
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(paciente.fecha)
            setSintomas(paciente.sintomas)
        }
    }, [paciente])

    const generarId = () => {
        const random = Math.random().toString(36).substr(2);
        const fecha = Date.now().toString(36);

        return random + fecha;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if ( [nombre, propietario, email, fecha, sintomas].includes('') ) {
            setError(true)
            return
        }
        setError(false)

        const objetoPaciente = {
            nombre,
            propietario,
            email,
            fecha,
            sintomas
        }

        if (paciente.id) {
            // Editando el registro
            objetoPaciente.id = paciente.id;

            const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState)

            setPacientes(pacientesActualizados)
            setPaciente({})
        } else {
            // Nuevo registro
            objetoPaciente.id = generarId();
            setPacientes([...pacientes, objetoPaciente]);
        }

        //Reinicio de valores
        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')
    }

    return (
        <div className='md:w-1/2 lg:w-2/5 mx-5 mb-5'>
            <h2 className='font-black text-3xl text-center'>Seguimiento Pacientes</h2>
            <p className='text-lg mt-5 text-center mb-10'>
                Añade pacientes y {''}
                <span className='text-indigo-600 font-bold'>adminístralos.</span>
            </p>

            <form
                onSubmit={handleSubmit}
                className='bg-white shadow-md rounded-lg py-5 px-5'>
                
                <div>
                    <label htmlFor='mascota' className='block text-gray-700 uppercase font-bold'>Nombre mascota</label>
                    <input 
                        id='mascota'
                        type="text"
                        placeholder='Nombre de la mascota'
                        className='border-2 py-2 px-2 mt-2 w-full placeholder-gray-400 rounded-md'
                        value={nombre}
                        onChange={ (e) => setNombre(e.target.value)}
                    />
                </div>
                <div className='mt-5'>
                    <label htmlFor='propietario'className='block text-gray-700 uppercase font-bold'>Nombre propietario</label>
                    <input id='propietario'
                    type="text"
                    placeholder='Nombre del propietario'
                    className='border-2 py-2 px-2 mt-2 w-full placeholder-gray-400 rounded-md'
                    value={propietario}
                    onChange={ (e) => setPropietario(e.target.value)}/>
                </div>
                <div className='mt-5'>
                    <label htmlFor='email' className='block text-gray-700 uppercase font-bold'>Email propietario</label>
                    <input id='email'
                    type="text"
                    placeholder='Email del propietario'
                    className='border-2 py-2 px-2 mt-2 w-full placeholder-gray-400 rounded-md'
                    value={email}
                    onChange={ (e) => setEmail(e.target.value)}/>
                </div>
                <div className='mt-5'>
                    <label htmlFor='alta' className='block text-gray-700 uppercase font-bold'>Alta</label>
                    <input id='alta'
                    type="date"
                    className='border-2 py-2 px-2 mt-2 w-full placeholder-gray-400 rounded-md'
                    value={fecha}
                    onChange={ (e) => setFecha(e.target.value)}/>
                </div>
                <div className='mt-5'>
                    <label htmlFor='alta' className='block text-gray-700 uppercase font-bold'>Síntomas</label>
                    <textarea name="" id="sintomas"
                    placeholder='Describe los síntomas' 
                    cols="30"
                    rows="10"
                    className='w-full border-2 rounded-md pt-2 pl-2'
                    value={sintomas}
                    onChange={ (e) => setSintomas(e.target.value)}></textarea>
                </div>
                <input type="submit" className='bg-indigo-600 w-full p-3 text-white mt-2 font-bold uppercase hover:bg-indigo-700 cursor-pointer transition-colors'
                value={ paciente.id ? 'Editar paciente' : 'Agregar paciente' } />
                { error && <Error><p>Todos los campos son obligatorios.</p></Error> }
            </form>
        </div>
    )
}

export default Formularios
