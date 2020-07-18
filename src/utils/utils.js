function removeCategory(categories, category) {
  const index = categories.findIndex((element) => {
    return element.slug === category.slug;
  });
  if (index > -1) {
    categories.splice(index, 1)[0];
  }
  for (const catg of categories) {
    removeCategory(catg.children, category);
  }
}

function placeCategory(categories, category) {
  for (const catg of categories) {
    if (catg.id === category.parent) catg.children.push(category);
    else placeCategory(catg.children, category);
  }
}

export { removeCategory, placeCategory };
