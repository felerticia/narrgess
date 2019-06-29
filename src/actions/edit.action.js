// Local requirements
import { request, requestSetFirebase } from './utils';

// ---- USER ---- //
export const editUser = (id, payloads) => requestSetFirebase(`/users/${id}`, payloads);
export const editUserArchive = (id, payloads) => requestSetFirebase(`/archives/users/${id}`, payloads);
export const editUserEmail = (id, email) => request(`edit/userEmail/${id}`, { email });

// -- ADMINS -- //
export const editAdmin = (id, payloads) => requestSetFirebase(`/admins/${id}`, payloads);
export const editAdminArchive = (id, payloads) => requestSetFirebase(`/archives/admins/${id}`, payloads);

// -- SECRETAIRES -- //
export const editSecretaire = (id, payloads) => requestSetFirebase(`/secretaires/${id}`, payloads);
export const editSecretaireArchive = (id, payloads) => requestSetFirebase(`/archives/secretaires/${id}`, payloads);

// -- MONITEURS -- //
export const editMoniteur = (id, payloads) => requestSetFirebase(`/moniteurs/${id}`, payloads);
export const editMoniteurArchive = (id, payloads) => requestSetFirebase(`/archives/moniteurs/${id}`, payloads);

// -- ELEVES -- //
export const editEleve = (id, payloads) => requestSetFirebase(`/eleves/${id}`, payloads);
export const editEleveArchive = (id, payloads) => requestSetFirebase(`/archives/eleves/${id}`, payloads);
export const editElevePlanning = (id, payloads) => requestSetFirebase(`/eleves/${id}/planning`, payloads);
export const editElevePenalty = (id, payloads) => requestSetFirebase(`/eleves/${id}/compte/penalty`, payloads);
export const editElevePanier = (id, payloads) => requestSetFirebase(`/eleves/${id}/panier`, payloads);
export const editElevePanierProduct = (idEleve, idProduct, payloads) => requestSetFirebase(`/eleves/${idEleve}/panier/${idProduct}`, payloads);
export const editEleveDossierPiece = (idEleve, idPiece, payloads) => requestSetFirebase(`/eleves/${idEleve}/dossier/pieces/${idPiece}`, payloads);
export const editEleveEstimation = (idEleve, idEstimation, payloads) => requestSetFirebase(`/eleves/${idEleve}/estimations/${idEstimation}`, payloads);
export const editElevePlanningElement = (idEleve, idPlanning, payloads) => requestSetFirebase(`/eleves/${idEleve}/planning/${idPlanning}`, payloads);
export const editEleveAbsencesElement = (idEleve, idAbsences, payloads) => requestSetFirebase(`/eleves/${idEleve}/absences/${idAbsences}`, payloads);
export const editEleveCompetence = (idEleve, idCompetence, key, type, payloads) => requestSetFirebase(`/eleves/${idEleve}/pedagogie/${idCompetence}/${key}/${type}`, payloads);

// -- BOUTIQUE -- //
export const editBoutique = (id, payloads) => requestSetFirebase(`/boutique/${id}`, payloads);
export const editBoutiqueArchive = (id, payloads) => requestSetFirebase(`/archives/boutique/${id}`, payloads);

// -- CONTRAT -- //
export const editContrat = (id, payloads) => requestSetFirebase(`/contrats/${id}`, payloads);

// -- LIEUX RDV -- //
export const editLieuxRDV = (id, payloads) => requestSetFirebase(`/lieuxRDV/${id}`, payloads);

// -- EXAMENS -- //
export const editExamen = (id, payloads) => requestSetFirebase(`/examens/${id}`, payloads);
export const editExamenEleve = (idExamen, idEleve, payloads) => requestSetFirebase(`/examens/${idExamen}/eleves/${idEleve}`, payloads);
export const editPreInscriptionExamens = (id, payloads) => requestSetFirebase(`/pre-inscriptions-examens/${id}`, payloads);
export const editPreInscriptionExamensArchive = (id, payloads) => requestSetFirebase(`/archives/pre-inscriptions-examens/${id}`, payloads);

// -- TYPES RDV -- //
export const editTypeRDV = (id, payloads) => requestSetFirebase(`/typesRDV/${id}`, payloads);

// -- ETABLISSEMENTS -- //
export const editEtablissement = (id, payloads) => requestSetFirebase(`/etablissements/${id}`, payloads);