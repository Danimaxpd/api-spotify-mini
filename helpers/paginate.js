async function paginate(model, query, page = 1, limit = 10, order) {
  const offset = (page - 1) * limit;

  try {
    const results = await model.findAndCountAll({
      limit,
      offset,
      order
    });

    const totalPages = Math.ceil(results.count / limit);
    const rows = results.rows;

    return {
      rows,
      pagination: {
        totalCount: results.count,
        currentPage: page,
        totalPages: totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  } catch (err) {
    console.error(err);
    throw new Error('Server error');
  }
}

module.exports = {
  paginate,
};