import rules from "../rbac-rules";

const check = (rules, role, action, data) => {
  const permissions = rules[role];
  if (!permissions) return false; // role is not present in the rules

  // staticPermissions
  if (permissions.static && permissions.static.includes(action)) return true;

  // dynamicPermissions
  if (permissions.dynamic) {
    const permissionCondition = permissions.dynamic[action];
    if (!permissionCondition) return false; // dynamic rule not provided for action
    return permissionCondition(data);
  }

  return false;
};

const Can = props =>
  check(rules, props.role, props.perform, props.data)
    ? props.yes()
    : props.no();

Can.defaultProps = {
  yes: () => null,
  no: () => null
};

export default Can;
