'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      state_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: {
              tableName: 'states',
            },
            key: 'id'
          },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      name: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
    await queryInterface.sequelize.query(`insert into cities (state_id, name) values (1, 'Ariana'), (1, 'Ettadhamen'), (1, 'Kalaat El Andalous'), (1, 'Mnihla'), (1, 'Raoued'), (1, 'Sidi Thabet'), (1, 'Soukra'), (2, 'Amdoun'), (2, 'Beja'), (2, 'Goubellat'), (2, 'Majaz al Bab'), (2, 'Nefza'), (2, 'Teboursouk'), (2, 'Testour'), (2, 'Thibar'), (3, 'Ben Arous'), (3, 'Bou Mhel el-Bassatine'), (3, 'El Mourouj'), (3, 'Ezzahra'), (3, 'Fouchana'), (3, 'Hammam Chott'), (3, 'Hammam Lif'), (3, 'Mohamedia'), (3, 'Medina Jedida'), (3, 'Megrine'), (3, 'Mornag'), (3, 'Rades'), (4, 'Bizerte'), (4, 'Djoumime'), (4, 'El Alia'), (4, 'Ghar El Melh'), (4, 'Ghezala'), (4, 'Mateur'), (4, 'Menzel Bourguiba'), (4, 'Menzel Jemil'), (4, 'Ras Jebel'), (4, 'Sejenane'), (4, 'Tinja'), (4, 'Utica'), (5, 'Gabes'), (5, 'Ghannouch'), (5, 'Hamma'), (5, 'Mareth'), (5, 'Matmata'), (5, 'Menzel Habib'), (5, 'Metouia'), (6, 'Belkhir'), (6, 'Gafsa'), (6, 'Guetar'), (6, 'Ksar'), (6, 'Mdhila'), (6, 'Metlaoui'), (6, 'Oum Larais'), (6, 'Redeyef'), (6, 'Sened'), (6, 'Sidi Aich'), (7, 'Ain Draham'), (7, 'Balta'), (7, 'Bou Salem'), (7, 'Fernana'), (7, 'Ghardimaou'), (7, 'Jendouba'), (7, 'Oued Melliz'), (7, 'Tabarka'), (8, 'Alaâ'), (8, 'Bouhajla'), (8, 'Chebika'), (8, 'Echrarda'), (8, 'Haffouz'), (8, 'Hajeb El Ayoun'), (8, 'Kairouan'), (8, 'Nasrallah'), (8, 'Oueslatia'), (8, 'Sbikha'), (9, 'Ayoun'), (9, 'Ezzouhour'), (9, 'Feriana'), (9, 'Foussana'), (9, 'Hassi El Ferid'), (9, 'Hidra'), (9, 'Jedeliane'), (9, 'Kasserine'), (9, 'Magel Bel Abbes'), (9, 'Sbeitla'), (9, 'Sbiba'), (9, 'Thala'), (10, 'Douz North'), (10, 'Douz South'), (10, 'Faouar'), (10, 'Kebili North'), (10, 'Kebili South'), (10, 'Souk El Ahed'), (11, 'Dahmani'), (11, 'Es Sers'), (11, 'Jerissa'), (11, 'Kalaa Khasbat'), (11, 'Kalaat Senane'), (11, 'Kef East'), (11, 'Kef West'), (11, 'Ksour'), (11, 'Nebeur'), (11, 'Sakiet Sidi Youssef'), (11, 'Tajerouine'), (12, 'Boumerdes'), (12, 'Chebba'), (12, 'Chorbane'), (12, 'El Djem'), (12, 'Hbira'), (12, 'Ksour Essef'), (12, 'Mahdia'), (12, 'Melloulech'), (12, 'Ouled Chamekh'), (12, 'Sidi Alouane'), (12, 'Souassi'), (13, 'Borj El Amri'), (13, 'Douar Hicher'), (13, 'El Battan'), (13, 'Jedaida'), (13, 'Manouba'), (13, 'Mornaguia'), (13, 'Oued Ellil'), (13, 'Tebourba'), (14, 'Ben Gardane'), (14, 'Beni Khedache'), (14, 'Djerba Ajim'), (14, 'Djerba Midoun'), (14, 'Djerba Houmt Souk'), (14, 'Medenine North'), (14, 'Medenine South'), (14, 'Sidi Makhlouf'), (14, 'Zarzis'), (15, 'Bekalta'), (15, 'Bembla'), (15, 'Beni Hassen'), (15, 'Jammel'), (15, 'Ksar Hellal'), (15, 'Ksibet El Mediouni'), (15, 'Moknine'), (15, 'Monastir'), (15, 'Ouerdanine'), (15, 'Sahline'), (15, 'Sayada-Lamta-Bou Hjar'), (15, 'Teboulba'), (15, 'Zeramdine'), (16, 'Beni Khalled'), (16, 'Beni Khiar'), (16, 'Bou Argoub'), (16, 'Dar Chaabane El Fehri'), (16, 'El Mida'), (16, 'Grombalia'), (16, 'Hammam Ghezaz'), (16, 'Hammamet'), (16, 'Haouaria'), (16, 'Kelibia'), (16, 'Korba'), (16, 'Menzel Bouzelfa'), (16, 'Menzel Temime'), (16, 'Nabeul'), (16, 'Soliman'), (16, 'Takelsa'), (17, 'Beni Khalled'), (17, 'Beni Khiar'), (17, 'Bou Argoub'), (17, 'Dar Chaabane El Fehri'), (17, 'El Mida'), (17, 'Grombalia'), (17, 'Hammam Ghezaz'), (17, 'Hammamet'), (17, 'Haouaria'), (17, 'Kelibia'), (17, 'Korba'), (17, 'Menzel Bouzelfa'), (17, 'Menzel Temime'), (17, 'Nabeul'), (17, 'Soliman'), (17, 'Takelsa'), (18, 'Bir El Hfay'), (18, 'Jelma'), (18, 'Mazzouna'), (18, 'Meknassi'), (18, 'Menzel Bouzaiene'), (18, 'Ouled Haffouz'), (18, 'Regueb'), (18, 'Sabalat Ouled Asker'), (18, 'Sidi Ali Ben Aoun'), (18, 'Sidi Bouzid East'), (18, 'Sidi Bouzid West'), (18, 'Souk Jedid'), (19, 'Bargou'), (19, 'Bouarada'), (19, 'El Aroussa'), (19, 'El Krib'), (19, 'Gaafour'), (19, 'Kesra'), (19, 'Makthar'), (19, 'Rouhia'), (19, 'Sidi Bourouis'), (19, 'Siliana North'), (19, 'Siliana South'), (20, 'Bargou'), (20, 'Bouarada'), (20, 'El Aroussa'), (20, 'El Krib'), (20, 'Gaafour'), (20, 'Kesra'), (20, 'Makthar'), (20, 'Rouhia'), (20, 'Sidi Bourouis'), (20, 'Siliana North'), (20, 'Siliana South'), (21, 'Bir Lahmar'), (21, 'Dhiba'), (21, 'Ghomrassen'), (21, 'Remada'), (21, 'Samar'), (21, 'Tataouine'), (22, 'Degueche'), (22, 'Hazoua'), (22, 'Nefta'), (22, 'Tamaghza'), (22, 'Tozeur'), (23, 'Bab Bhar'), (23, 'Bab Souika'), (23, 'Bardo'), (23, 'Bouhaira'), (23, 'Carthage'), (23, 'Bab El Khadra'), (23, 'El Menzah'), (23, 'El Omrane'), (23, 'El Ouardia'), (23, 'El Tahrir'), (23, 'Ezzouhour'), (23, 'Hrairia'), (23, 'Jebel Jelloud'), (23, 'Kabaria'), (23, 'La Goulette'), (23, 'La Marsa'), (23, 'Le Kram'), (23, 'Medina'), (23, 'Sidi El Bechir'), (23, 'Sidi Hassine'), (23, 'Sijoumi'), (24, 'Bir Mchergua'), (24, 'Fahs'), (24, 'Nadhour'), (24, 'Saouaf'), (24, 'Zaghouan'), (24, 'Zriba')`)
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cities');
  }
};