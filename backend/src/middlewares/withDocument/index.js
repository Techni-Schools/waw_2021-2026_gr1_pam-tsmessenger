import { AppError } from "../../utils.js";

const withDocument = (Model, fieldName) => async (req, res, next) => {
  const { params } = req;
  const { id } = params;

  const document = await Model.findById(id);
  if (!document) throw new AppError(`Not found`, 404);
  res.locals[fieldName] = document;

  next();
};

export default withDocument;
