import { CreateAuthorData, UpdateAuthorData} from "./author.validation.js";
import {
  findAuthorByName,
  createAuthor as createAuthorRepository,
  getAllAuthors as getAllAuthorsRepository,
  findAuthorById,
  updateAuthorById,
  deleteAuthorById,
} from "./author.repository.js";
import { AppError } from "../../utils/AppError.js";



export async function createAuthor(data: CreateAuthorData){
    const existingAuthor = await findAuthorByName(data.name);

    if(existingAuthor) {
        throw new AppError('Author already exists', 409)
    }

return createAuthorRepository(data);
}


export async function getAllAuthors() {
    return getAllAuthorsRepository();
}

export async function getAuthorById(authorId: number) {
    const author = await findAuthorById(authorId);

    if (!author) {
        throw new AppError('Author not found', 404);
    }

    return author;
}

export async function updateAuthor(
  authorId: number,
  data: UpdateAuthorData,
) {
  const existingAuthor = await findAuthorById(authorId);

  if (!existingAuthor) {
    throw new AppError('Author not found', 404);
  }

  const authorWithSameName = await findAuthorByName(data.name);

  if (
    authorWithSameName &&
    authorWithSameName.id !== existingAuthor.id
  ) {
    throw new AppError('Author already exists', 409);
  }

  return updateAuthorById(authorId, data);
}



export async function deleteAuthor(authorId: number) {

    const existingAuthor = await findAuthorById(authorId);

    if(!existingAuthor){
        throw new AppError('Author not found', 404)
    }

    await deleteAuthorById(authorId);

return {
  message: 'Author deleted successfully',
};
}