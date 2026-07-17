
import { db } from '../../db/db.js';
import {authors} from '../../db/schema/authors.js'
import { eq } from 'drizzle-orm'; 

export async function findAuthorById(authorId: number) {

return db.query.authors.findFirst({
    where: (authors, {eq}) => eq(authors.id,authorId )
})
}


export async function createAuthor(data: typeof authors.$inferInsert ){
    const [createdAuthor] = await db.insert(authors).values(data).returning();

    return createdAuthor;
}

export async function findAuthorByName(name: string){
    return db.query.authors.findFirst({
        where: (authors, {eq}) => eq(authors.name, name)
    })
}


export async function getAllAuthors(){
    return db.query.authors.findMany();
}

export async function updateAuthorById(authorId: number, data: typeof authors.$inferInsert){
    const [updatedAuthor] = await db.update(authors).set(data).where(eq(authors.id, authorId)).returning();

    return updatedAuthor;

}

export async function deleteAuthorById(authorId: number){
    const [deletedAuthor] = await db.delete(authors).where(eq(authors.id, authorId)).returning();

    return deletedAuthor;

}