/**
 * file ini cara baru kita untuk membuat model
 * file index akan secara otomatis memasukan definisi model kita 
 * jadi jika ingin membuat model baru tinggal buat file baru di folder ini dengan format seperti file ini
 * 
 */

module.exports = (sequelize, DataTypes) => {
    const Job = sequelize.define('Job', {
        name: DataTypes.STRING,
        attack: DataTypes.INTEGER,
        defence: DataTypes.INTEGER,
        agility: DataTypes.INTEGER,
        magic: DataTypes.INTEGER,
    });
  
    return Job;
  };