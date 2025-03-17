import express from "express";
import LoginAware from "../middleware/LoginAware.js";
import { body, validationResult } from "express-validator";

import Pass from "../models/passModel.js";

const passRouter = express.Router();

// Route 1: Store passwords, login required
passRouter.post(
  "/createpass",
  LoginAware,
  [
    body("notetitle", "title is too short").isLength({ min: 3 }),
    body("notedesc", "note is too short").isLength({ min: 3 }),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.send({ errors: result.array() });
    }

    try {
      // insertion
      // destructure
      const thisuserid = req.user.id;
      const { userid, notetitle, notedesc } = req.body;
      // insert
      const note = await Pass.create({
        userid: thisuserid,
        notetitle,
        notedesc,
      });
      res.json({ note });
    } catch (error) {
      res
        .status(500)
        .send({ Success: false, errors: [{ msg: "sdfsd server error" }] });
    }
  }
);

// Route 2: get passwords, login required
passRouter.get("/getnotes", LoginAware, async (req, res) => {
  try {
    // get details
    const thisuserid = req.user.id;
    const allnotes = await Pass.find({ userid: thisuserid });
    res.json(allnotes);
  } catch (error) {
    res
      .status(500)
      .send({ Success: false, errors: [{ msg: "sdfsd server error" }] });
  }
});

// Route 3: delete passwords, login required
passRouter.delete("/deletenote/:id", LoginAware, async (req, res) => {
  try {
    // get details
    const thisuserid = req.user.id;
    const id = req.params.id;
    const deletednote = await Pass.findByIdAndDelete({ _id: id });
    res.json(deletednote);
  } catch (error) {
    res
      .status(500)
      .send({ Success: false, errors: [{ msg: "sdfsd server error" }] });
  }
});

// route 4: update notes
passRouter.put(
  "/updatenote/:id",
  LoginAware,
  [
    body("notetitle", "title is too short").isLength({ min: 3 }),
    body("notedesc", "note is too short").isLength({ min: 3 }),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.send({ errors: result.array() });
    }
    try {
      // get details
      const thisuserid = req.user.id;
      const id = req.params.id;
      const { notetitle, notedesc } = req.body;
      const updatednote = await Pass.findByIdAndUpdate(
        { _id: id },
        { notetitle, notedesc }
      );
      res.json(updatednote);
    } catch (error) {
      res
        .status(500)
        .send({ Success: false, errors: [{ msg: "sdfsd server error" }] });
    }
  }
);

// route 5: get specific user
passRouter.get("/getnote/:id", LoginAware, async (req, res) => {
  try {
    // get details
    const thisuserid = req.user.id;
    const id = req.params.id;
    const specificNote = await Pass.findById({ _id: id });
    res.json(specificNote);
  } catch (error) {
    res
      .status(500)
      .send({ Success: false, errors: [{ msg: "sdfsd server error" }] });
  }
});

export default passRouter;
