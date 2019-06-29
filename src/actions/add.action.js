// Local requirements
import { request, requestPushFirebase } from './utils';

// ---- USERS ---- //
export const createUser = (email, password) => request("add/createUser", { email, password });
export const addUser = (email, password, type, level, data) => request("add/user", { email, password, type, level, data });

// -- ELEVES -- //
export const addElevePlanning = (id, payloads) => requestPushFirebase(`/eleves/${id}/planning`, payloads);
export const addElevePastExams = (id, payloads) => requestPushFirebase(`/eleves/${id}/pastExams`, payloads);
export const addEleveNotes = (id, payloads) => requestPushFirebase(`/eleves/${id}/notes`, payloads);
export const addEleveEstimation = (id, payloads) => requestPushFirebase(`/eleves/${id}/estimations`, payloads);
export const addPlanning = (typeRDV, eleve, coords, heuresChoisies) => request("add/planning", { typeRDV, eleve, coords, heuresChoisies });
export const addCompte = (id, type, payloads) => request("add/compte", { id, type, payloads });

// -- BOUTIQUE -- //
export const addBoutique = payloads => requestPushFirebase("/boutique", payloads);

// -- CONTRAT -- //
export const addContrat = payloads => requestPushFirebase("/contrats", payloads);

// -- MONITEURS -- //
export const addMoniteurLieuxRDV = (moniteurId, payloads) => requestPushFirebase(`/moniteurs/${moniteurId}/lieuxRDV`, payloads);
export const addMoniteurIndisponibilites = (moniteurId, payloads) => requestPushFirebase(`/moniteurs/${moniteurId}/indisponibilites`, payloads);
export const addMoniteurParcAutomobile = (moniteurId, payloads) => requestPushFirebase(`/moniteurs/${moniteurId}/parcAutomobile`, payloads);

// -- LIEUX RDV -- //
export const addLieuxRDV = payloads => requestPushFirebase("/lieuxRDV", payloads);
export const addLieuxRDVMoniteur = (lieuxId, payloads) => requestPushFirebase(`/lieuxRDV/${lieuxId}/moniteurs`, payloads);

// -- EXAMENS -- //
export const addExamen = payloads => requestPushFirebase("/examens", payloads);
export const addExamenEleve = (idExamen, payloads) => requestPushFirebase(`/examens/${idExamen}/eleves`, payloads);
export const addExamenPreInscriptions = payloads => requestPushFirebase("/pre-inscriptions-examens", payloads);

// -- TYPES RDV -- //
export const addTypeRDV = payloads => requestPushFirebase("/typesRDV", payloads);

// -- ETABLISSEMENTS -- //
export const addEtablissement = payloads => requestPushFirebase("/etablissements", payloads);
