const { Document } = require('../models');
const { User } = require('../models');
const controllerHelpers = require('../helpers/controllerHelpers');

/* Defines  Document Controller methods */
class DocController {

  /**
    * create method
    * Creates a document
    * @params req
    * @params res
    * @return { object } - A response to the user
  */
  create(req, res) {
    if (controllerHelpers.validateInput(req.body)) {
      return res.status(403).json({
        message: 'Please fill the required fields!',
      });
    }

    return Document
      .create({
        title: req.body.title,
        content: req.body.content,
        access: req.body.access,
        userId: req.decoded.id,
      })
      .then((document) => {
        return res.status(201).json({
          message: 'Document created successfully!',
          document,
        });
      })
      .catch(error => res.status(400).json(error));
  }

  /**
   * findsByTitle method
   * Finds a document by the title provided
   * @params req - document title
   * @params res
   * @return { object } - A response to the user
 */
  findByTitle(req, res) {
    if (req.decoded.data === 'admin') {
      if (req.query.q) {
        return Document
          .findAll({
            where: {
              title: { $iLike: `%${req.query.q}%` },
            },
          })
          .then((document) => { res.status(200).json(document); })
          .catch(error => res.status(400).json(error));
      }
    } else if (req.query.q) {
      return Document
          .findAll({
            where: {
              title: { $iLike: `%${req.query.q}%` },
              access: 'public',
            },
          })
          .then((document) => {
            if (!document) {
              return res.status(404).json({
                message: 'Document is not available',
              });
            }
            return res.status(200).json(document);
          })
          .catch(error => res.status(400).json(error));
    }
  }

  /**
   * find method
   * Finds a document by the id specified
   * @params req - document id
   * @params res
   * @return { object } - A response to the user
 */
  find(req, res) {
    return Document
      .findOne({
        where: {
          id: req.params.id,
          userId: req.decoded.id,
        },
      })
      .then((document) => {
        if (!document) {
          return res.status(404).json({
            message: 'Document is not available',
          });
        }
        return res.status(200).json(document);
      })
      .catch(error => res.status(400).json(error));
  }

  /**
   * list method
   * Lists all documents found in the database
   * @params req
   * @params res
   * @return { object } - A response to the user
 */
  list(req, res) {
    if (req.decoded.data === 'admin') {
      if (req.query.limit || req.query.offset) {
        return Document
          .findAll({
            limit: req.query.limit,
            offset: req.query.offset,
          })
          .then((document) => {
            if (!document) {
              return res.status(404).json({
                message: 'Document is not available',
              });
            }
            res.status(200).json({ document });
          })
          .catch(error => res.status(400).json(error));
      } else {
        return Document
          .findAll()
          .then(document => res.status(200).json({ document }))
          .catch(error => res.status(400).json(error));
      }
    } else if (req.query.limit || req.query.offset) {
      // console.log('role docs>>>>>>', req.decoded.data);
      return Document
          .findAll({
            limit: req.query.limit,
            offset: req.query.offset,
            where: {
              // access: req.decoded.data || 'public',
              $or: [
                {
                  access:
                  {
                    $eq: req.decoded.data,
                  },
                },
                {
                  access: {
                    $eq: 'public',
                  },
                },
              ],
            },
          })
          .then((document) => {
            if (!document) {
              return res.status(404).json({
                message: 'Document is not available',
              });
            }
            res.status(200).json({ document });
          })
          .catch(error => res.status(400).json(error));
    } else {
      return Document
          .findAll({
            where: {
              access: 'public',
            },
          })
          .then(document => res.status(200).json({ document }))
          .catch(error => res.status(400).json(error));
    }
  }

  /**
   * update method
   * Updates a document
   * @params req - document id, change to be made
   * @params res
   * @return { object } - A response to the user
 */
  update(req, res) {
    const updateDocument = req.body;
    return Document
      .update(updateDocument, {
        where: {
          id: req.params.id,
        },
        returning: true,
        plain: true,
      })
      .then(result =>
      res.status(201).json({
        document: result[1].dataValues,
        message: 'Document Successfully updated!',
      }),
      )
      .catch(error => res.status(400).json(error));
  }

  /**
   * delete method
   * Deletes a document
   * @params req - document id
   * @params res
   * @return { object } - A response to the user
 */
  delete(req, res) {
    return Document
      .destroy({
        where: {
          id: req.params.id,
          userId: req.decoded.id,
        },
      })
      .then(() => res.status(200).json({ message: 'Document successfully deleted!' }))
      .catch(error => res.status(400).json(error));
  }
}

module.exports = new DocController();
