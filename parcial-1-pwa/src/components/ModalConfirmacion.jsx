function ModalConfirmacion({ abierto, mensaje, onConfirmar, onCancelar }) {
  if (!abierto) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-contenido">
        <h3>Confirmar eliminación</h3>
        <p>{mensaje}</p>

        <div className="modal-acciones">
          <button className="btn-eliminar" onClick={onConfirmar}>
            Sí, eliminar
          </button>
          <button className="btn-secundario" onClick={onCancelar}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalConfirmacion;