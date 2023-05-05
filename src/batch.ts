import { db } from "./firebase"

type ModelType = any // TypeTeaser | TypeMatch | etc...

export const batchFunc = (collection: string) => {
	const batch = db.batch()

	const addDoc = (data: any, model: (obj?: any) => ModelType) => {
		const collectionRef = db.collection(collection)
		const newId = collectionRef.doc()
		batch.set(newId, model({ ...data, id: newId.id }))
	}

	const updateDoc = (id: string, data: Partial<ModelType>) => {
		const collectionRef = db.collection(collection).doc(id)
		batch.update(collectionRef, { ...data })
	}

	const deleteDoc = (id: string) => {
		const collectionRef = db.collection(collection).doc(id)
		batch.delete(collectionRef)
	}

	const commit = async () => await batch.commit().then(() => true).catch(() => false)

	return {
		addDoc,
		updateDoc,
		deleteDoc,
		commit,
	}
}