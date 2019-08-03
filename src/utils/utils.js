export function flatCategories(array) {
    let result = [];
    if (array.length === undefined) {
      return
    }
    array.forEach(catg => {
      result.push({ id: catg.id, name: catg.name });
      if (catg.subCategories && catg.subCategories.length) {
        result = result.concat(this.flatCategories(catg.subCategories));
      }
    });
    return result;
  }