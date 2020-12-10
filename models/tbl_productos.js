module.exports = (sequelize, type) => {
    return sequelize.define('tbl_producto', {
        pro_id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        pro_nombre: {
            type: type.STRING
        },
        pro_id_categoria: type.INTEGER,
        pro_foto: {
            type: type.STRING,
            defaultValue: 'https://lh3.googleusercontent.com/proxy/h5uwf34I0cHnq9wBx4NU2M-Zsf5jm3tNddoe-vM-nSgblinlyWi3M8ytnpUVLd_9WUu7AeF6ZkErsjJw_06mcYBuHmYNFX3lvSLlxKkUSpxNmWlzCezvOQdW3A',
        },
        pro_estado: {
            type: type.BOOLEAN,
            defaultValue: true
        }
    });
}