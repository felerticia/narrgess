// Local requirements
import { request, requestRemoveFirebase } from './utils';

// ---- USER ---- //
export const deleteUser = id => requestRemoveFirebase(`/users/${id}`);
export const deleteUserArchive = id => requestRemoveFirebase(`/archives/users/${id}`);

// -- ADMIN -- //
export const deleteAdmin = id => requestRemoveFirebase(`/admins/${id}`);
export const deleteAdminArchive = id => requestRemoveFirebase(`/archives/admins/${id}`);

// -- SECRETAIRES -- //
export const deleteSecretaire = id => requestRemoveFirebase(`/secretaires/${id}`);
export const deleteSecretaireArchive = id => requestRemoveFirebase(`/archives/secretaires/${id}`);

// -- MONITEUR -- //
export const deleteMoniteur = id => requestRemoveFirebase(`/moniteurs/${id}`);
export const deleteMoniteurArchive = id => requestRemoveFirebase(`/archives/moniteurs/${id}`);
export const deleteMoniteurLieuxRDV = (moniteurId, lieuxId) => requestRemoveFirebase(`/moniteurs/${moniteurId}/lieuxRDV/${lieuxId}`);
export const deleteMoniteurIndisponibilites = (moniteurId, indisponibiliteId) => requestRemoveFirebase(`/moniteurs/${moniteurId}/indisponibilites/${indisponibiliteId}`);
export const deleteMoniteurParcAutomobile = (moniteurId, parcId) => requestRemoveFirebase(`/moniteurs/${moniteurId}/parcAutomobile/${parcId}`);
export const deleteMoniteurImageName = id => requestRemoveFirebase(`/moniteurs/${id}/imageName`);
export const deleteMoniteurImageURL = id => requestRemoveFirebase(`/moniteurs/${id}/imageUrl`);

// -- ELEVE -- //
export const deleteEleve = id => requestRemoveFirebase(`/eleves/${id}`);
export const deleteEleveArchive = id => requestRemoveFirebase(`/archives/eleves/${id}`);
export const deleteEleveCompte = (idEleve, type, idType) => requestRemoveFirebase(`/eleves/${idEleve}/compte/${type}/${idType}`);
export const deleteElevePlanning = (idEleve, idPlanning) => requestRemoveFirebase(`/eleves/${idEleve}/planning/${idPlanning}`);
export const deleteEleveAbsences = (idEleve, idAbsences) => requestRemoveFirebase(`/eleves/${idEleve}/absences/${idAbsences}`);
export const deleteElevePastExams = (idEleve, idPastExam) => requestRemoveFirebase(`/eleves/${idEleve}/pastExams/${idPastExam}`);
export const deleteElevePanierProduct = (idEleve, idProduct) => requestRemoveFirebase(`/eleves/${idEleve}/panier/${idProduct}`);
export const deleteEleveEstimation = (idEleve, idEstimation) => requestRemoveFirebase(`/eleves/${idEleve}/estimations/${idEstimation}`);
export const deletePlanning = (eleveId, coursId) => request(`delete/planning`, { eleveId, coursId });

// -- TYPERDV -- //
export const deleteTypeRDV = id => requestRemoveFirebase(`/typesRDV/${id}`);

// -- ETABLISSEMENTS -- //
export const deleteEtablissement = id => requestRemoveFirebase(`/etablissements/${id}`);

// -- LIEUX RDV -- //
export const deleteLieuxRDV = id => requestRemoveFirebase(`/lieuxRDV/${id}`);
export const deleteLieuxRDVMoniteur = (lieuxId, moniteurId) => requestRemoveFirebase(`/lieuxRDV/${lieuxId}/moniteurs/${moniteurId}`);

// -- BOUTIQUE -- //
export const deleteBoutique = id => requestRemoveFirebase(`/boutique/${id}`);

// -- CONTRAT -- //
export const deleteContrat = id => requestRemoveFirebase(`/contrats/${id}`);

// -- EXAMEN -- //
export const deleteExamen = id => requestRemoveFirebase(`/examens/${id}`);
export const deleteExamenEleve = (idExamen, idEleve) => requestRemoveFirebase(`/examens/${idExamen}/eleves/${idEleve}`);
export const deletePreInscriptionExamens = id => requestRemoveFirebase(`/pre-inscriptions-examens/${id}`);