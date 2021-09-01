
import { firebaseApp } from './firebase'
import firebase from 'firebase'
require('firebase/firestore')

import { fileToBlob } from './helpers'

const db = firebase.firestore(firebaseApp)

export const isUserLogged = () => {
    let isLogged = false
    firebase.auth().onAuthStateChanged((user) => {
        user !== null && (isLogged = true)
    })
    return isLogged
}

export const getCurrentUser =  () => {
    return  firebase.auth().currentUser
}


export const closeSession = () => {
    return firebase.auth().signOut()
}

export const registerUser = async (email, password) => {
    const result = { statusResponse: true, error: null }
    try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
    } catch (error) {
        result.statusResponse = false
        result.error = "Este correo ya ha sido registrado."
    }
    return result
}

export const loginWithEmailAndPassword = async (email, password) => {
    const result = { statusResponse: true, error: null }
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
    } catch (error) {
        result.statusResponse = false
        result.error = "Usuario o contraseña no válidos"
    }
    return result
}

export const uploadImage = async (image, path, name) => {
    const result = { statusResponse: false, error: null, url: null }
    const ref = firebase.storage().ref(path).child(name)
    const blob = await fileToBlob(image)
    try {
        await ref.put(blob)
        const url = await firebase.storage().ref(`${path}/${name}`).getDownloadURL()
        result.statusResponse = true
        result.url = url
    } catch (error) {
        result.error = error
    }
    return result
}

export const updateProfile = async (data) => {
    const result = { statusResponse: true, error: null }
    try {
        await firebase.auth().currentUser.updateProfile(data)

    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result
}

export const reauthenticate = async (password) => {
    const result = { statusResponse: true, error: null }
    const user = getCurrentUser()
    const credentials = firebase.auth.EmailAuthProvider.credential(user.email, password)
    try {
        await user.reauthenticateWithCredential(credentials)

    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result
}

export const updateEmail = async (email) => {
    const result = { statusResponse: true, error: null }
    try {
        await firebase.auth().currentUser.updateEmail(email)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result
}

export const updatePassword = async (password) => {
    const result = { statusResponse: true, error: null }
    try {
        await firebase.auth().currentUser.updatePassword(password)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result
}

export const addDocumentWithoutId = async (collection, data) => {
    const result = { statusResponse: true, error: null }
    try {
        await db.collection(collection).add(data)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result
}

export const getDocumentsWithLimit = async (collection, limit) => {
    const result = { statusResponse: true, error: null, documents: [], start: null }
    try {
        const response = await db
            .collection(collection)
            .orderBy("createAt", "desc")
            .limit(limit)
            .get()
        if (response.docs.length > 0) {
            result.start = response.docs[response.docs.length - 1]
        }
        response.forEach((doc) => {
            const document = doc.data()
            document.id = doc.id
            result.documents.push(document)
        })
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    // console.log("result", result)

    return result
}

export const getMechanics = async (limitMechanics) => {
    const result = { statusResponse: true, error: null, mechanics: [], startMechanic: null }
    try {
        const response = await db
            .collection("mechanics")
            .orderBy("createAt", "desc")
            .limit(limitMechanics)
            .get()
        if (response.docs.length > 0) {
            result.startMechanic = response.docs[response.docs.length - 1]
        }
        response.forEach((doc) => {
            const mechanic = doc.data()
            mechanic.id = doc.id
            result.mechanics.push(mechanic)
        })
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    // console.log("result", result)

    return result
}

export const getMoreMechanics = async (limitMechanics, startMechanic) => {
    const result = { statusResponse: true, error: null, mechanics: [], startMechanic: null }
    try {
        const response = await db
            .collection("mechanics")
            .orderBy("createAt", "desc")
            .startAfter(startMechanic.data().createAt)
            .limit(limitMechanics)
            .get()
        if (response.docs.length > 0) {
            result.startMechanic = response.docs[response.docs.length - 1]
        }
        response.forEach((doc) => {
            const mechanic = doc.data()
            mechanic.id = doc.id
            result.mechanics.push(mechanic)
        })
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result
}

export const getMoreGarages = async (limitGarage, startGarage) => {
    const result = { statusResponse: true, error: null, garages: [], startGarage: null }
    try {
        const response = await db
            .collection("garages")
            .orderBy("createAt", "desc")
            .startAfter(startGarage.data().createAt)
            .limit(limitGarage)
            .get()
        if (response.docs.length > 0) {
            result.startGarage = response.docs[response.docs.length - 1]
        }
        response.forEach((doc) => {
            const garage = doc.data()
            garage.id = doc.id
            result.garages.push(garage)
        })
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result
}

export const getDocumentById = async (collection, id) => {
    const result = { statusResponse: true, error: null, document: null }
    try {
        const response = await db.collection(collection).doc(id).get()
        result.document = response.data()
        result.document.id = response.id
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result
}

export const getIsFavorite = async(idMechanic) => {
    const result = { statusResponse: true, error: null, isFavorite: false }
    try {
        const response = await db
            .collection("favorites")
            .where("idMechanic", "==", idMechanic)
            .where("idUser", "==", getCurrentUser().uid)
            .get()
        result.isFavorite = response.docs.length > 0
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

export const deleteFavorite = async(idMechanic) => {
    const result = { statusResponse: true, error: null }
    try {
        const response = await db
            .collection("favorites")
            .where("idMechanic", "==", idMechanic)
            .where("idUser", "==", getCurrentUser().uid)
            .get()
        response.forEach(async(doc) => {
            const favoriteId = doc.id
            await db.collection("favorites").doc(favoriteId).delete()
        })    
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}
