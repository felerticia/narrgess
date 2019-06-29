// Local requirements
import { request, requestGetFirebase } from './utils';

// -- USERS -- //
export const getUsers = () => requestGetFirebase("/users", {});
export const getUser = id => requestGetFirebase(`/users/${id}`, {});
export const getUserLevel = id => requestGetFirebase(`/users/${id}/level`, -1);
export const getUserType = id => requestGetFirebase(`/users/${id}/type`, "");
export const getUserEmail = id => requestGetFirebase(`/users/${id}/email`, "");

// -- ADMINS -- //
export const getAdmins = () => requestGetFirebase("/admins", {});
export const getAdmin = id => requestGetFirebase(`/admins/${id}`, {});

// -- SECRETAIRES -- //
export const getSecretaires = () => requestGetFirebase("/secretaires", {});
export const getSecretaire = id => requestGetFirebase(`/secretaires/${id}`, {});

// -- MONITEURS -- //
export const getMoniteurs = () => requestGetFirebase("/moniteurs", {});
export const getMoniteur = id => requestGetFirebase(`/moniteurs/${id}`, {});
export const getMoniteursLieuxRDV = id => requestGetFirebase(`/moniteurs/${id}/lieuxRDV`, {});
export const getMoniteursParcAutomobile = id => requestGetFirebase(`/moniteurs/${id}/parcAutomobile`, {});

// -- ELEVES -- //
export const getEleves = () => requestGetFirebase("/eleves", {});
export const getEleve = id => requestGetFirebase(`/eleves/${id}`, {});
export const getEleveEstimations = id => requestGetFirebase(`/eleves/${id}/estimations`, {});
export const getEleveDossier = id => requestGetFirebase(`/eleves/${id}/dossier`, {});
export const getEleveDossierPieces = id => requestGetFirebase(`/eleves/${id}/dossier/pieces`, {});
export const getEleveDossierPiece = (idEleve, idPiece) => requestGetFirebase(`/eleves/${idEleve}/dossier/pieces/${idPiece}`, {});
export const getEleveCompte = id => requestGetFirebase(`/eleves/${id}/compte`, {});
export const getEleveVentes = id => requestGetFirebase(`/eleves/${id}/compte/ventes`, {});
export const getEleveEncaissements = id => requestGetFirebase(`/eleves/${id}/compte/encaissements`, {});
export const getEleveImpayes = id => requestGetFirebase(`/eleves/${id}/compte/impayes`, {});
export const getEleveRemboursements = id => requestGetFirebase(`/eleves/${id}/compte/remboursements`, {});
export const getElevePlanning = id => requestGetFirebase(`/eleves/${id}/planning`, {});
export const getEleveAbsences = id => requestGetFirebase(`/eleves/${id}/absences`, {});
export const getElevePastExamens = id => requestGetFirebase(`/eleves/${id}/pastExams`, {});
export const getEleveNotes = id => requestGetFirebase(`/eleves/${id}/notes`, {});
export const getElevePanier = id => requestGetFirebase(`/eleves/${id}/panier`, {});
export const getElevePedagogie = id => requestGetFirebase(`/eleves/${id}/pedagogie`, {});
export const getEleveCompetence = (id, competence) => requestGetFirebase(`/eleves/${id}/pedagogie/${competence}`, {});
export const getElevePlanningElement = (idEleve, idPlanning) => requestGetFirebase(`/eleves/${idEleve}/planning/${idPlanning}`, {});
export const getEleveAbsencesElement = (idEleve, idAbsences) => requestGetFirebase(`/eleves/${idEleve}/absences/${idAbsences}`, {});
export const getEleveNbHours = (eleve, typeRDV) => request(`get/elevesNbHours/${eleve}`, { typeRDV });

// -- TYPES RDV -- //
export const getTypesRDV = () => requestGetFirebase("/typesRDV", {});
export const getTypeRDV = id => requestGetFirebase(`/typesRDV/${id}`, {});

// -- LIEUX RDV -- //
export const getLieuxRDV = () => requestGetFirebase("/lieuxRDV", {});
export const getLieuRDV = id => requestGetFirebase(`/lieuxRDV/${id}`, {});
export const getLieuxRDVMoniteurs = id => requestGetFirebase(`/lieuxRDV/${id}/moniteurs`, {});

// -- EXAMENS -- //
export const getExamens = () => requestGetFirebase("/examens", {});
export const getExamen = id => requestGetFirebase(`/examens/${id}`, {});
export const getExamenEleves = id => requestGetFirebase(`/examens/${id}/eleves`, {});
export const getExamenBordereau = id => request(`get/bordereau/${id}`);
export const getExamenConvocation = (examen, eleve) => request(`get/convocation`, { examen, eleve });
export const getExamenPreInscriptions = () => requestGetFirebase("/pre-inscriptions-examens", {});

// -- BOUTIQUE -- //
export const getBoutiques = () => requestGetFirebase("/boutique", {});
export const getBoutique = id => requestGetFirebase(`/boutique/${id}`, {});

// -- CONTRATS -- //
export const getContrats = () => requestGetFirebase("/contrats", {});
export const getContrat = id => requestGetFirebase(`/contrats/${id}`, {});

// -- ETABLISSEMENTS -- //
export const getEtablissements = () => requestGetFirebase("/etablissements", {});
export const getEtablissement = id => requestGetFirebase(`/etablissements/${id}`, {});

// -- ARCHIVES -- //
export const getArchives = () => requestGetFirebase("/archives", {});
export const getUsersArchives = () => requestGetFirebase("/archives/users", {});
export const getUserArchives = id => requestGetFirebase(`/archives/users/${id}`, {});
export const getAdminsArchives = () => requestGetFirebase("/archives/admins", {});
export const getAdminArchives = id => requestGetFirebase(`/archives/admins/${id}`, {});
export const getSecretairesArchives = () => requestGetFirebase("/archives/secretaires", {});
export const getSecretaireArchives = id => requestGetFirebase(`/archives/secretaires/${id}`, {});
export const getMoniteursArchives = () => requestGetFirebase("/archives/moniteurs", {});
export const getMoniteurArchives = id => requestGetFirebase(`/archives/moniteurs/${id}`, {});
export const getElevesArchives = () => requestGetFirebase("/archives/eleves", {});
export const getEleveArchives = id => requestGetFirebase(`/archives/eleves/${id}`, {});
export const getBoutiquesArchives = () => requestGetFirebase("/archives/boutique", {});
export const getBoutiqueArchives = id => requestGetFirebase(`/archives/boutique/${id}`, {});

// -- PDF DOCUMENTS -- //
export const getPDFContrat = (id, eleveId) => request(`get/contrats/${id}`, { eleveId });
export const getPDFFacture = facture => request("get/factures", { facture });
export const getPDFLivretPedagogique = eleve => request(`get/livretPedagogique/${eleve}`);

// -- EVENTS -- //
export const getEvents = (id, type) => request(`get/events/${id}`, { type });
export const getAvailableHours = (typeRDV, eleve, coords, distance, disponibilites, moniteursRequested) => request('get/availableHours', { typeRDV, eleve, coords, distance, disponibilites, moniteursRequested });
export const getListHours = eleve => request(`get/listHours/${eleve}`);
