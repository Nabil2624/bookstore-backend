import { AppError } from '../../utils/AppError.js';


import {
  findCategoryByName,
  createCategory as createCategoryRepository,
  getAllCategories as getAllCategoriesRepository,
  findCategoryById,
  updateCategoryById as updateCategoryByIdRepository,
  deleteCategoryById as deleteCategoryByIdRepository
} from './categories.repository.js';
import { CreateCategoryData, UpdateCategoryData } from './categories.validation.js';

export async function createCategory(data: CreateCategoryData) {
  const exisitngCategory = await findCategoryByName(data.name);

  if (exisitngCategory) {
    throw new AppError('Category already exist', 409);
  }

  return createCategoryRepository(data);
}

export async function getAllCategories() {
  return getAllCategoriesRepository();
}

export async function getCategoryById(categoryId: number) {
  const category = await findCategoryById(categoryId);

  if (!category) {
    throw new AppError('Category not found', 404);
  }

  return category;

}


export async function updateCategoryById(categoryId: number, data: UpdateCategoryData){
    const exisitngCategory = await findCategoryById(categoryId);

    if(!exisitngCategory){
        throw new AppError('Category not found', 404)
    }

    const categoryWithSameName = await findCategoryByName(data.name)

    if (categoryWithSameName && categoryWithSameName.id !== categoryId){
        throw new AppError('Category already exists', 409)
    }

    return updateCategoryByIdRepository(categoryId, data)
}



export async function deleteCategoryById(categoryId: number) {
  const existingCategory = await findCategoryById(categoryId);

  if (!existingCategory) {
    throw new AppError('Category not found', 404);
  }

  await deleteCategoryByIdRepository(categoryId);

  return {
    message: 'Category deleted successfully',
  };
}




