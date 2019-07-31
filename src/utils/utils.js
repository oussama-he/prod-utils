export function flatCategories(array) {
    let result = [];
    array.forEach(catg => {
      result.push({ id: catg.id, name: catg.name });
      if (catg.subCategories && catg.subCategories.length) {
        result = result.concat(this.flatCategories(catg.subCategories));
      }
    });
    return result;
  }