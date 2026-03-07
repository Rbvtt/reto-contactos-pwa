import { useEffect, useState } from "react";

function FormularioPaciente({ onGuardarPaciente, pacienteAEditar, onCancelarEdicion }) {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    telefono: "",
  });

  const [errores, setErrores] = useState({
    nombre: "",
    apellido: "",
    dni: "",
  });

  useEffect(() => {
    if (pacienteAEditar) {
      setFormData({
        nombre: pacienteAEditar.nombre || "",
        apellido: pacienteAEditar.apellido || "",
        dni: pacienteAEditar.dni || "",
        telefono: pacienteAEditar.telefono || "",
      });
    } else {
      limpiarFormulario();
    }
  }, [pacienteAEditar]);

  const limpiarFormulario = () => {
    setFormData({
      nombre: "",
      apellido: "",
      dni: "",
      telefono: "",
    });

    setErrores({
      nombre: "",
      apellido: "",
      dni: "",
    });
  };

  const validarCampo = (name, value) => {
    if (name === "nombre") {
      if (!value.trim()) return "El nombre es obligatorio";
    }

    if (name === "apellido") {
      if (!value.trim()) return "El apellido es obligatorio";
    }

    if (name === "dni") {
      if (!value.trim()) return "El DNI es obligatorio";
      if (!/^\d+$/.test(value)) return "El DNI debe contener solo números";
      if (value.length < 7 || value.length > 8) {
        return "El DNI debe tener entre 7 y 8 dígitos";
      }
    }

    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const nuevoValor = name === "dni" ? value.replace(/\D/g, "") : value;

    setFormData((prev) => ({
      ...prev,
      [name]: nuevoValor,
    }));

    setErrores((prev) => ({
      ...prev,
      [name]: validarCampo(name, nuevoValor),
    }));
  };

  const validarFormulario = () => {
    const nuevosErrores = {
      nombre: validarCampo("nombre", formData.nombre),
      apellido: validarCampo("apellido", formData.apellido),
      dni: validarCampo("dni", formData.dni),
    };

    setErrores(nuevosErrores);

    return !nuevosErrores.nombre && !nuevosErrores.apellido && !nuevosErrores.dni;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    onGuardarPaciente(formData);
    limpiarFormulario();
  };

  const handleCancelar = () => {
    limpiarFormulario();
    onCancelarEdicion();
  };

  return (
    <section className="card">
      <h2>{pacienteAEditar ? "Editar paciente" : "Registrar paciente"}</h2>

      <form className="form-paciente" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
          {errores.nombre && <p className="error">{errores.nombre}</p>}
        </div>

        <div>
          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={formData.apellido}
            onChange={handleChange}
          />
          {errores.apellido && <p className="error">{errores.apellido}</p>}
        </div>

        <div>
          <input
            type="text"
            name="dni"
            placeholder="DNI"
            value={formData.dni}
            onChange={handleChange}
          />
          {errores.dni && <p className="error">{errores.dni}</p>}
        </div>

        <div>
          <input
            type="text"
            name="telefono"
            placeholder="Teléfono"
            value={formData.telefono}
            onChange={handleChange}
          />
        </div>

        <div className="acciones-formulario">
          <button type="submit">
            {pacienteAEditar ? "Actualizar paciente" : "Guardar paciente"}
          </button>

          {pacienteAEditar && (
            <button type="button" className="btn-secundario" onClick={handleCancelar}>
              Cancelar
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default FormularioPaciente;