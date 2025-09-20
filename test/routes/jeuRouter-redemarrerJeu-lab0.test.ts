// Vous devez insérer les nouveaux tests ici
import { assert } from 'console';
import 'jest-extended';
import app from '../../src/app';
import supertest from 'supertest'
import { jeuRoutes } from '../../src/routes/jeuRouter';

const request = supertest(app);

const testNom1 = 'Luffy';
const testNom2 = 'Zoro'
describe('GET /api/v1/jeu/redemarrerJeu', () => {
  beforeAll(async () => {
    await request.post('/api/v1/jeu/demarrerJeu').send({nom: testNom1})
    await request.post('/api/v1/jeu/demarrerJeu').send({nom: testNom2})
  });
  
  it("devrair redémarrer le jeu", async () => {
    const response = await request.get('/api/v1/jeu/redemarrerJeu')
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
  });

  it("ne devrait plus y avoir de joueurs après le redémarrage", async() => {
    const response = await request.get('/api/v1/jeu/redemarrerJeu');
    //console.log(response.body)
    const joueurListe = response.body.liste;
    
    expect(joueurListe).toEqual([]);
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
  })

  it(`devrait répondre avec une mauvaise demande lorsque le joueur veut jouer après un redémarrage ${testNom2}`, async () => {
        const response = await request.get('/api/v1/jeu/jouer/' + testNom2);
        expect(response.status).toBe(404);
    });
});
